'use client';
import { useEffect } from "react";

import { Dashboard } from "@/components/Dashboard/Dashboard";
import { FormsClient } from "@/components/FormsClient/FormsClient";

import { useStore } from "@/store/store";
import { fetchData } from "@/services";

export default function Home() {

  const { setRowsInitial, openDialog, setOpenDialog, setIsLoading } = useStore();

  useEffect(() => {
    const request = async () => {
      const data = await fetchData();
      setRowsInitial(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000)
    }
    request();
  }, [setRowsInitial, setIsLoading]);

  const handleClose = () => {
    setOpenDialog(false);
  }
  return (
    <main className="bg-gray-100 flex items-start h-screen w-[100vw] justify-start sm:py-12 py-4">
      <Dashboard />
      <FormsClient open={openDialog} onClose={handleClose} />
    </main>
  );
}
