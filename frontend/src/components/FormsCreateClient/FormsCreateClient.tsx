'use client';
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'

import { AlertComponent, ButtonComponent, InputComponent } from '../common';

import { useStore } from '@/store/store';
import { createClient, getApiData } from '@/services';
import { DataClientCreate } from '@/interfaces/DataClient';

type Props = {
  open: boolean;
  onClose: () => void;
}
export function CreateClientModal({ open, onClose }: Props) {
  const { setRowsInitial } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cordinateX, setCordinateX] = useState('');
  const [cordinateY, setCordinateY] = useState('');
  const [alert, setAlert] = useState({ open: false, message: 'Teste', severity: 'info' });

  const mappingMessagesAlert = {
    name: 'Por favor, preencha o campo nome',
    invalidEmail: 'Email inválido. Por favor, insira um email válido.',
    phone: 'Por favor, preencha o campo telefone',
    cordinateX: 'Por favor, preencha o campo coordenada X',
    cordinateY: 'Por favor, preencha o campo coordenada Y',
    success: 'Cliente criado com sucesso!',
    emailDuplicate: 'Email já cadastrado. Por favor, insira um email diferente.',
  }

  const showAlert = (message: string, severity: string) => {
    setAlert({ open: true, message, severity });
  };

  const closeAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleClearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCordinateX('');
    setCordinateY('');
    onClose();
    closeAlert();
  }
  const validateField = (field: string, value: string) => {
    const fieldValidations: { [key: string]: { test: () => boolean, message: string, severity?: 'success' | 'info' | 'warning' | 'error' } } = {
      name: { test: () => !!value, message: mappingMessagesAlert.name },
      email: { test: () => !!value && /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value), message: mappingMessagesAlert.invalidEmail, severity: 'error' },
      phone: { test: () => !!value, message: mappingMessagesAlert.phone },
      cordinateX: { test: () => !!value, message: mappingMessagesAlert.cordinateX },
      cordinateY: { test: () => !!value, message: mappingMessagesAlert.cordinateY },
    };

    const { test, message, severity = 'warning' } = fieldValidations[field];
    const isValid = test();

    if (!isValid) {
      showAlert(message, severity);
    }

    return isValid;
  };
  const handleSubmit = async () => {
    const fields = ['name', 'email', 'phone', 'cordinateX', 'cordinateY'];

    for (const field of fields) {
      const isValid = validateField(field, eval(field));
      if (!isValid) {
        return;
      }
    }

    const data: DataClientCreate = {
      nome: name,
      email,
      telefone: phone,
      coordenada_x: Number(cordinateX),
      coordenada_y: Number(cordinateY),
    };

    const saveClient = await createClient(data);

    if (saveClient.error?.includes('duplicate key value violates unique constraint "clientes_email_key"')) {
      showAlert(mappingMessagesAlert.emailDuplicate, 'error');
      return;
    }

    if (saveClient) {
      showAlert(mappingMessagesAlert.success, 'success');
      const data = await getApiData();
      setRowsInitial(data);
      handleClearFields();
    }
  };

  const renderInputs = [
    {
      label: 'Nome',
      value: name,
      onChange: setName,
    },
    {
      label: 'Telefone',
      value: phone,
      onChange: setPhone,
      placeholder: '00 00000-0000'
    },
    {
      label: 'Email',
      value: email,
      onChange: setEmail
    },
    {
      label: 'Cordenada X',
      value: cordinateX,
      onChange: setCordinateX
    },
    {
      label: 'Cordenada Y',
      value: cordinateY,
      onChange: setCordinateY
    }
  ]

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="create-client-dialog">
      {alert.open && (
        <AlertComponent
          severity={alert.severity as 'success' | 'error' | 'info' | 'warning'}
          message={alert.message}
          onClose={closeAlert}
        />
      )}
      <DialogTitle id="create-client-dialog-title" className='text-center'>Criar Novo Cliente</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {renderInputs.map((input) =>
            <InputComponent key={input.label} {...input} />
          )}
        </Grid>
      </DialogContent>
      <DialogActions className='flex items-center justify-center'>
        <ButtonComponent onClick={handleClearFields} className=' bg-red-500 hover:bg-red-700 text-white '>
          Cancelar
        </ButtonComponent>
        <ButtonComponent onClick={handleSubmit} className=' bg-green-500 hover:bg-green-700 text-white '>
          Criar
        </ButtonComponent>
      </DialogActions>
    </Dialog>
  );
};
