import { createLazyFileRoute } from "@tanstack/react-router";
import AccountLayout from "../layouts/Account/AccountLayout";
import { useState } from "react";
import ScreenUserProfil from "../components/Account/ScreenUserProfil";
import ScreenAccountSetting from "../components/Account/ScreenAccountSetting";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/account")({
  component: () => (
    <Protected roles={[1]}>
      <Account />
    </Protected>
  ),
});

function Account() {
  const [openUserProfil, setOpenUserProfil] = useState(true);
  const [openAccountSetting, setOpenAccountSetting] = useState(false);
  return (
    <>
      <AccountLayout
        openUserProfil={openUserProfil}
        setOpenUserProfil={setOpenUserProfil}
        openAccountSetting={openAccountSetting}
        setOpenAccountSetting={setOpenAccountSetting}
      >
        {openUserProfil && <ScreenUserProfil />}
        {openAccountSetting && <ScreenAccountSetting />}
      </AccountLayout>
    </>
  );
}
