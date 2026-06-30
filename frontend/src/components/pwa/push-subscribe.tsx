'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, BellOff, Loader2 } from 'lucide-react'

// VAPID public key from environment (base64url-encoded)
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''

/**
 * Convert a base64url string to a Uint8Array for the Push API.
 */
function urlBase64ToUint8Array(base64url: string): Uint8Array {
  // Pad to make length multiple of 4
  const padding = '='.repeat((4 - (base64url.length % 4)) % 4)
  const base64 = (base64url + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const arr = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) {
    arr[i] = raw.charCodeAt(i)
  }
  return arr
}

type PushState = 'unsupported' | 'denied' | 'granted' | 'subscribing' | 'subscribed' | 'unsubscribing'

const STORAGE_KEY = 'tbd-push-enabled'

export function PushSubscribeButton() {
  const [pushState, setPushState] = useState<PushState>('unsupported')
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  // Check initial state
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setPushState('unsupported')
      return
    }

    // Get the service worker registration
    navigator.serviceWorker.ready.then((reg) => {
      setRegistration(reg)
      reg.pushManager.getSubscription().then((sub) => {
        if (sub) {
          setPushState('subscribed')
        } else if (Notification.permission === 'denied') {
          setPushState('denied')
        } else {
          setPushState('granted')
        }
      })
    })
  }, [])

  const subscribe = useCallback(async () => {
    if (!registration || !VAPID_PUBLIC_KEY) return
    setPushState('subscribing')

    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setPushState('denied')
        return
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as unknown as BufferSource,
      })

      // Store the subscription as JSON in localStorage
      // (in production, this would be sent to a push relay service)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription.toJSON()))

      setPushState('subscribed')
    } catch {
      setPushState('granted')
    }
  }, [registration])

  const unsubscribe = useCallback(async () => {
    if (!registration) return
    setPushState('unsubscribing')

    try {
      const sub = await registration.pushManager.getSubscription()
      if (sub) {
        await sub.unsubscribe()
      }
      localStorage.removeItem(STORAGE_KEY)
      setPushState('granted')
    } catch {
      setPushState('subscribed')
    }
  }, [registration])

  if (pushState === 'unsupported') return null

  return (
    <button
      type="button"
      onClick={pushState === 'subscribed' ? unsubscribe : subscribe}
      disabled={pushState === 'subscribing' || pushState === 'unsubscribing' || pushState === 'denied'}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      aria-label={
        pushState === 'subscribed'
          ? 'Unsubscribe from notifications'
          : pushState === 'denied'
            ? 'Notifications blocked — update browser settings'
            : 'Subscribe to notifications'
      }
    >
      {pushState === 'subscribing' || pushState === 'unsubscribing' ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : pushState === 'subscribed' ? (
        <Bell className="w-4 h-4" />
      ) : (
        <BellOff className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {pushState === 'subscribed'
          ? 'Notifications On'
          : pushState === 'denied'
            ? 'Notifications Blocked'
            : 'Get Notified'}
      </span>
    </button>
  )
}
