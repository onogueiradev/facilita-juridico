'use client';
import React, { useCallback, useState } from 'react';
import { Grid } from '@mui/material';

import { ButtonComponent, CoordinateSelect, InputComponent } from '../common';
import { MapComponent } from '../MapComponent/MapComponent';

import { useStore } from '@/store/store';

export function Filters() {
  const { rowsInitial, setNewRows, setRowsInitial, setOpenDialog, setActionError, setMessageAlertClient, setActionSuccess } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cordinateX, setCordinateX] = useState('');
  const [cordinateY, setCordinateY] = useState('');

  const [openModal, setOpenModal] = useState(false);


  const cordinatesX = Array.from(new Set(rowsInitial.map((row) => row.coordenada_x).sort((a, b) => a - b)));
  const cordinatesY = Array.from(new Set(rowsInitial.map((row) => row.coordenada_y).sort((a, b) => a - b)));

  function removeAccentsAndSpecialChars(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9 ]/g, '');
  }

  const applyFilters = useCallback(() => {
    if (!name && !email && !phone && !cordinateX && !cordinateY) {
      setActionError(true);
      setMessageAlertClient('Preencha ao menos um campo para filtrar');
      setTimeout(() => {
        setActionError(false);
        setMessageAlertClient('');
      }, 5000);
      return;
    }
    const filteredRows = rowsInitial?.filter((row) => {
      const formattedName = removeAccentsAndSpecialChars(name.toLowerCase());
      const formattedRowName = removeAccentsAndSpecialChars(row.nome.toLowerCase());
      const passName = !name || formattedRowName.includes(formattedName);

      const formattedEmail = removeAccentsAndSpecialChars(email.toLowerCase());
      const formattedRowEmail = removeAccentsAndSpecialChars(row.email.toLowerCase());
      const passEmail = !email || formattedRowEmail.includes(formattedEmail);

      const formattedPhone = removeAccentsAndSpecialChars(phone.toLowerCase());
      const formattedRowPhone = removeAccentsAndSpecialChars(row.telefone.toLowerCase());
      const passPhone = !phone || formattedRowPhone.includes(formattedPhone);

      const passCordinateX = !cordinateX || row.coordenada_x?.toString() == cordinateX;
      const passCordinateY = !cordinateY || row.coordenada_y?.toString() == cordinateY;

      return passName && passEmail && passPhone && passCordinateX && passCordinateY;
    });

    setActionError(filteredRows.length === 0);
    setMessageAlertClient('Nenhum resultado encontrado');
    setNewRows(filteredRows);

    setTimeout(() => {
      setActionError(false);
      setMessageAlertClient('');
    }, 5000);
  }, [name, email, phone, cordinateX, cordinateY, rowsInitial, setNewRows, setActionError, setMessageAlertClient]);


  const resetFilters = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCordinateX('');
    setCordinateY('');
    setRowsInitial(rowsInitial);
    setNewRows([])
    handleResetAlert()
  };

  const handleCreate = () => {
    setOpenDialog(true)
    setMessageAlertClient('');
    handleResetAlert()
    resetFilters()
  }
  const handleVisitation = () => {
    setOpenModal(true)
    handleResetAlert()
    resetFilters()
  }

  const handleResetAlert = () => {
    setActionError(false);
    setActionSuccess(false);
    setMessageAlertClient('');
  }

  const renderInputs = [
    {
      label: 'Nome',
      value: name,
      onChange: setName,
      placeholder: 'Filtre por nome',

    },
    {
      label: 'Email',
      value: email,
      onChange: setEmail,
      placeholder: 'Filtre por email',

    },
    {
      label: 'Telefone',
      value: phone,
      onChange: setPhone,
      placeholder: 'Filtre por telefone',

    },
    {
      label: 'Cordenada X',
      value: cordinateX,
      onChange: setCordinateX,
      options: cordinatesX,
    },
    {
      label: 'Cordenada Y',
      value: cordinateY,
      onChange: setCordinateY,
      options: cordinatesY,
    },
  ]

  const renderButtons = [
    { text: 'Filtrar', onClick: applyFilters, className: 'bg-indigo-500 hover:bg-indigo-700 text-white sm:text-base !m-0 sm:!m-2 px-4 w-4/12 sm:w-2/12' },
    { text: 'Limpar', onClick: resetFilters, className: 'bg-orange-500 hover:bg-orange-700 text-white sm:text-base !m-0 sm:!m-2 px-4 w-4/12 sm:w-2/12' },
    { text: 'Criar', onClick: handleCreate, className: 'bg-green-500 hover:bg-green-700 text-white sm:text-base !m-0 sm:!m-2 px-4 w-4/12 sm:w-2/12' },
    { text: 'Visitação', onClick: handleVisitation, className: 'bg-purple-500 hover:bg-purple-700 text-white sm:text-base !m-0 sm:!m-2 px-4 w-4/12 sm:w-2/12' },
  ];

  return (
    <Grid container spacing={2} className='p-3'>
      {renderInputs.map((input, index) => {
        return input.options
          ? <CoordinateSelect key={index} {...input} />
          : <InputComponent key={index} {...input} />
      })}
      <Grid item xs={12} sm={12} className="flex items-center justify-center space-x-4 mt-2 gap-1 flex-wrap">
        {renderButtons.map((button, index) => {
          return <ButtonComponent key={index} {...button}>{button.text}</ButtonComponent>
        })}
      </Grid>
      <MapComponent openModal={openModal} setOpenModal={setOpenModal} />
    </Grid>
  );
}
