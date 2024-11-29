/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const ResetPasswordLazyImport = createFileRoute('/resetPassword')()
const RegisterLazyImport = createFileRoute('/register')()
const OtpLazyImport = createFileRoute('/otp')()
const NotificationLazyImport = createFileRoute('/notification')()
const LoginLazyImport = createFileRoute('/login')()
const HistoryLazyImport = createFileRoute('/history')()
const AccountLazyImport = createFileRoute('/account')()
const IndexLazyImport = createFileRoute('/')()
const PemesananIndexLazyImport = createFileRoute('/Pemesanan/')()
const BayarIndexLazyImport = createFileRoute('/Bayar/')()

// Create/Update Routes

const ResetPasswordLazyRoute = ResetPasswordLazyImport.update({
  id: '/resetPassword',
  path: '/resetPassword',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/resetPassword.lazy').then((d) => d.Route))

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const OtpLazyRoute = OtpLazyImport.update({
  id: '/otp',
  path: '/otp',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/otp.lazy').then((d) => d.Route))

const NotificationLazyRoute = NotificationLazyImport.update({
  id: '/notification',
  path: '/notification',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notification.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const HistoryLazyRoute = HistoryLazyImport.update({
  id: '/history',
  path: '/history',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/history.lazy').then((d) => d.Route))

const AccountLazyRoute = AccountLazyImport.update({
  id: '/account',
  path: '/account',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/account.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PemesananIndexLazyRoute = PemesananIndexLazyImport.update({
  id: '/Pemesanan/',
  path: '/Pemesanan/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/Pemesanan/index.lazy').then((d) => d.Route),
)

const BayarIndexLazyRoute = BayarIndexLazyImport.update({
  id: '/Bayar/',
  path: '/Bayar/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/Bayar/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/account': {
      id: '/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountLazyImport
      parentRoute: typeof rootRoute
    }
    '/history': {
      id: '/history'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof HistoryLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/notification': {
      id: '/notification'
      path: '/notification'
      fullPath: '/notification'
      preLoaderRoute: typeof NotificationLazyImport
      parentRoute: typeof rootRoute
    }
    '/otp': {
      id: '/otp'
      path: '/otp'
      fullPath: '/otp'
      preLoaderRoute: typeof OtpLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/resetPassword': {
      id: '/resetPassword'
      path: '/resetPassword'
      fullPath: '/resetPassword'
      preLoaderRoute: typeof ResetPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/Bayar/': {
      id: '/Bayar/'
      path: '/Bayar'
      fullPath: '/Bayar'
      preLoaderRoute: typeof BayarIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/Pemesanan/': {
      id: '/Pemesanan/'
      path: '/Pemesanan'
      fullPath: '/Pemesanan'
      preLoaderRoute: typeof PemesananIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/account': typeof AccountLazyRoute
  '/history': typeof HistoryLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/resetPassword': typeof ResetPasswordLazyRoute
  '/Bayar': typeof BayarIndexLazyRoute
  '/Pemesanan': typeof PemesananIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/account': typeof AccountLazyRoute
  '/history': typeof HistoryLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/resetPassword': typeof ResetPasswordLazyRoute
  '/Bayar': typeof BayarIndexLazyRoute
  '/Pemesanan': typeof PemesananIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/account': typeof AccountLazyRoute
  '/history': typeof HistoryLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/otp': typeof OtpLazyRoute
  '/register': typeof RegisterLazyRoute
  '/resetPassword': typeof ResetPasswordLazyRoute
  '/Bayar/': typeof BayarIndexLazyRoute
  '/Pemesanan/': typeof PemesananIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/account'
    | '/history'
    | '/login'
    | '/notification'
    | '/otp'
    | '/register'
    | '/resetPassword'
    | '/Bayar'
    | '/Pemesanan'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/account'
    | '/history'
    | '/login'
    | '/notification'
    | '/otp'
    | '/register'
    | '/resetPassword'
    | '/Bayar'
    | '/Pemesanan'
  id:
    | '__root__'
    | '/'
    | '/account'
    | '/history'
    | '/login'
    | '/notification'
    | '/otp'
    | '/register'
    | '/resetPassword'
    | '/Bayar/'
    | '/Pemesanan/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AccountLazyRoute: typeof AccountLazyRoute
  HistoryLazyRoute: typeof HistoryLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  NotificationLazyRoute: typeof NotificationLazyRoute
  OtpLazyRoute: typeof OtpLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
  BayarIndexLazyRoute: typeof BayarIndexLazyRoute
  PemesananIndexLazyRoute: typeof PemesananIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AccountLazyRoute: AccountLazyRoute,
  HistoryLazyRoute: HistoryLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  NotificationLazyRoute: NotificationLazyRoute,
  OtpLazyRoute: OtpLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
  BayarIndexLazyRoute: BayarIndexLazyRoute,
  PemesananIndexLazyRoute: PemesananIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/account",
        "/history",
        "/login",
        "/notification",
        "/otp",
        "/register",
        "/resetPassword",
        "/Bayar/",
        "/Pemesanan/"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/account": {
      "filePath": "account.lazy.jsx"
    },
    "/history": {
      "filePath": "history.lazy.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/notification": {
      "filePath": "notification.lazy.jsx"
    },
    "/otp": {
      "filePath": "otp.lazy.jsx"
    },
    "/register": {
      "filePath": "register.lazy.jsx"
    },
    "/resetPassword": {
      "filePath": "resetPassword.lazy.jsx"
    },
    "/Bayar/": {
      "filePath": "Bayar/index.lazy.jsx"
    },
    "/Pemesanan/": {
      "filePath": "Pemesanan/index.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
