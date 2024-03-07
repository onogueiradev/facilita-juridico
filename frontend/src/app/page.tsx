'use client';
import { useEffect } from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import { CreateClientModal } from "@/components/FormsCreateClient/FormsCreateClient";

import { useStore } from "@/store/store";
import { getApiData } from "@/services";

export default function Home() {

  const { setRowsInitial, openDialog, setOpenDialog } = useStore();

  useEffect(() => {
    const request = async () => {
      const data = await getApiData();
      setRowsInitial(data);
    }
    request();
  }, [setRowsInitial]);

  const handleClose = () => {
    setOpenDialog(false);
  }
  return (
    <main className="bg-gray-100 flex items-start h-screen w-[100vw] justify-start py-12">
      <Dashboard />
      <CreateClientModal open={openDialog} onClose={handleClose} />
    </main>
  );
}
