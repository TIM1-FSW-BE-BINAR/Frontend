import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import NavbarPemesanan from "../../components/Navbar-Pemesanan";

export const Route = createLazyFileRoute('/Bayar/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <NavbarPemesanan >

    </NavbarPemesanan>
  )
}

import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import NavbarPemesanan from "../../components/Navbar-pemesanan";

export const Route = createLazyFileRoute('/Bayar/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <NavbarPemesanan >

    </NavbarPemesanan>
  )
}
