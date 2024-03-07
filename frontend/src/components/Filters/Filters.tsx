'use client';
import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';

import { ButtonComponent, CoordinateSelect, InputComponent } from '../common';

import { useStore } from '@/store/store';

export function Filters() {
  const { rowsInitial, setNewRows, setRowsInitial, setOpenDialog } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cordinateX, setCordinateX] = useState('');
  const [cordinateY, setCordinateY] = useState('');
  const [noResults, setNoResults] = useState(false);

  const cordinatesX = Array.from(new Set(rowsInitial.map((row) => row.coordenada_x).sort((a, b) => a - b)));
  const cordinatesY = Array.from(new Set(rowsInitial.map((row) => row.coordenada_y).sort((a, b) => a - b)));

  function removeAccentsAndSpecialChars(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9 ]/g, '');
  }

  const applyFilters = () => {
    setNoResults(false);
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

    setNoResults(filteredRows.length === 0);
    setNewRows(filteredRows);
  };

  const resetFilters = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCordinateX('');
    setCordinateY('');
    setRowsInitial(rowsInitial);
    setNewRows([])
    setNoResults(false);
  };

  return (
    <Grid container spacing={2} className='p-6'>
      <InputComponent label='Nome' value={name} onChange={setName} />
      <InputComponent label='Email' value={email} onChange={setEmail} />
      <CoordinateSelect
        label='Cordenada X'
        value={cordinateX}
        onChange={setCordinateX}
        options={cordinatesX}
      />
      <CoordinateSelect
        label='Cordenada Y'
        value={cordinateY}
        onChange={setCordinateY}
        options={cordinatesY}
      />
      <InputComponent
        label='Telefone'
        value={phone}
        onChange={setPhone}
      />
      <Grid item xs={12} sm={6} className="flex items-center justify-end space-x-4">
        <ButtonComponent onClick={applyFilters} className=' bg-indigo-500 hover:bg-indigo-700 text-white'>
          Filtrar
        </ButtonComponent>
        <ButtonComponent onClick={resetFilters} className='bg-orange-500 hover:bg-orange-700 text-white'>
          Limpar
        </ButtonComponent>
        <ButtonComponent onClick={() => setOpenDialog(true)} className=' bg-green-500 hover:bg-green-700 text-white'>
          Criar
        </ButtonComponent>
      </Grid>
      {noResults && (
        <Grid item xs={12} className="flex items-center justify-center mt-4">
          <Typography variant="h6" className="text-red-500 bg-red-100 px-4 py-2 rounded-full flex items-center text-base">
            <Close className="text-red-500" />
            Nenhum resultado encontrado
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
