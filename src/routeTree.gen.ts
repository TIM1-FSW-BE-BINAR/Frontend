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

const SearchLazyImport = createFileRoute('/search')()
const ResetPasswordLazyImport = createFileRoute('/resetPassword')()
const RegisterLazyImport = createFileRoute('/register')()
const PaymentLazyImport = createFileRoute('/payment')()
const OtpLazyImport = createFileRoute('/otp')()
const NotificationLazyImport = createFileRoute('/notification')()
const LoginLazyImport = createFileRoute('/login')()
const HistoryLazyImport = createFileRoute('/history')()
const AccountLazyImport = createFileRoute('/account')()
const IndexLazyImport = createFileRoute('/')()
const PemesananIndexLazyImport = createFileRoute('/Pemesanan/')()

// Create/Update Routes

const SearchLazyRoute = SearchLazyImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/search.lazy').then((d) => d.Route))

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

const PaymentLazyRoute = PaymentLazyImport.update({
  id: '/payment',
  path: '/payment',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/payment.lazy').then((d) => d.Route))

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
    '/payment': {
      id: '/payment'
      path: '/payment'
      fullPath: '/payment'
      preLoaderRoute: typeof PaymentLazyImport
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
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchLazyImport
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
  '/payment': typeof PaymentLazyRoute
  '/register': typeof RegisterLazyRoute
  '/resetPassword': typeof ResetPasswordLazyRoute
  '/search': typeof SearchLazyRoute
  '/Pemesanan': typeof PemesananIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/account': typeof AccountLazyRoute
  '/history': typeof HistoryLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/otp': typeof OtpLazyRoute
  '/payment': typeof PaymentLazyRoute
  '/register': typeof RegisterLazyRoute
  '/resetPassword': typeof ResetPasswordLazyRoute
  '/search': typeof SearchLazyRoute
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
  '/payment': typeof PaymentLazyRoute
  '/register': typeof RegisterLazyRoute
  '/resetPassword': typeof ResetPasswordLazyRoute
  '/search': typeof SearchLazyRoute
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
    | '/payment'
    | '/register'
    | '/resetPassword'
    | '/search'
    | '/Pemesanan'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/account'
    | '/history'
    | '/login'
    | '/notification'
    | '/otp'
    | '/payment'
    | '/register'
    | '/resetPassword'
    | '/search'
    | '/Pemesanan'
  id:
    | '__root__'
    | '/'
    | '/account'
    | '/history'
    | '/login'
    | '/notification'
    | '/otp'
    | '/payment'
    | '/register'
    | '/resetPassword'
    | '/search'
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
  PaymentLazyRoute: typeof PaymentLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
  SearchLazyRoute: typeof SearchLazyRoute
  PemesananIndexLazyRoute: typeof PemesananIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AccountLazyRoute: AccountLazyRoute,
  HistoryLazyRoute: HistoryLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  NotificationLazyRoute: NotificationLazyRoute,
  OtpLazyRoute: OtpLazyRoute,
  PaymentLazyRoute: PaymentLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
  SearchLazyRoute: SearchLazyRoute,
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
        "/payment",
        "/register",
        "/resetPassword",
        "/search",
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
    "/payment": {
      "filePath": "payment.lazy.jsx"
    },
    "/register": {
      "filePath": "register.lazy.jsx"
    },
    "/resetPassword": {
      "filePath": "resetPassword.lazy.jsx"
    },
    "/search": {
      "filePath": "search.lazy.jsx"
    },
    "/Pemesanan/": {
      "filePath": "Pemesanan/index.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
