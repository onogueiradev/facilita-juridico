'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ButtonComponent, TooltipComponent } from '../common';

import { useStore } from '@/store/store';
import { fetchData } from '@/services';
import { DataClient } from '@/interfaces/DataClient';

interface Props {
  customers?: DataClient[];
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}
export function MapComponent({ openModal, setOpenModal }: Props) {
  const { setNewRows, rowsInitial } = useStore();

  const [visitOrder, setVisitOrder] = useState<{ id: number, name: string }[]>([]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const request = async () => {
      const data = await fetchData('clients/visit-order')

      setOpenModal(true);
      setVisitOrder(data);
    }
    if (openModal) {
      request();
    }
  }, [openModal, setOpenModal]);

  const handleSearchById = (clientId: number) => {
    setNewRows(rowsInitial.filter((row) => row.id === clientId));
    handleCloseModal();
  }

  return (
    <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="create-client-dialog" className="modal-dialog w-[400px] m-auto max-h-[800px] overflow-y-auto" maxWidth="md">
      <DialogTitle id="create-client-dialog-title" className='text-center'>Ordem de visitação</DialogTitle>
      <DialogContent>
        <List>
          {visitOrder?.map((client, index) => (
            <TooltipComponent
              key={index}
              title="Visualizar cliente"
              placement="left"
              onClick={() => handleSearchById(client.id)}
            >
              <ListItem key={client.id} className=" shado border-gray-200 py-2 hover:shadow-lg transition-all cursor-pointer w-full flex items-center justify-center gap-2 rounded-full hover:bg-gray-100" onClick={() => handleSearchById(client.id)}>
                <AccountCircleIcon className='text-4xl text-gray-500' />
                <ListItemText primary={`Cliente ${client.name}`} />
              </ListItem>
            </TooltipComponent>
          ))}
        </List>
      </DialogContent>
      <DialogActions className='flex items-center justify-center'>
        <ButtonComponent onClick={handleCloseModal} className='bg-red-500 hover:bg-red-700 text-white mr-2'>
          Fechar
        </ButtonComponent>
      </DialogActions>
    </Dialog>

  )
}