'use client';
import React, { useMemo, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Toolbar, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TrashIcon from '@mui/icons-material/Delete';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { CheckCircleOutline } from '@mui/icons-material';

import { Filters } from '../Filters/Filters';
import { EnhancedTableHead } from './EnhancedTableHead';
import { ButtonComponent, TooltipComponent } from '../common';

import { useStore } from '@/store/store';
import { fetchData } from '@/services';
import { DataClient } from '@/interfaces/DataClient';

function createData(
  id: number,
  nome: string,
  email: string,
  telefone: string,
  coordenada_x: number,
  coordenada_y: number,
): DataClient {
  return {
    id,
    nome,
    email,
    telefone,
    coordenada_x,
    coordenada_y,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function TableSorted() {
  const { rowsInitial, newRows, setDataEdit, setIsEditing, setOpenDialog, setRowsInitial, messageAlertClient, setMessageAlertClient, actionSuccess, setActionSuccess, actionError } = useStore();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof DataClient>('nome');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clientDelete, setClientDelete] = useState<DataClient>();
  const [open, setOpen] = useState(false);

  const rows = (newRows.length > 0 ? newRows : rowsInitial)?.map((row) => createData(row.id || 0, row.nome, row.email, row.telefone, row.coordenada_x, row.coordenada_y));

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof DataClient,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEditClient = (client: DataClient) => {
    setDataEdit(client);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleClickOpen = (client: DataClient) => {
    setOpen(true);
    setClientDelete(client);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteClient = async () => {
    try {
      const id = clientDelete?.id;
      await fetchData(`clients/${id}`, 'DELETE');
      setOpen(false);
      const response = await fetchData('clients');
      setRowsInitial(response);
      setActionSuccess(true);
      setMessageAlertClient('Cliente excluído com sucesso!');

      setTimeout(() => {
        setActionSuccess(false);
        setMessageAlertClient('');
      }, 5000);
    } catch (error) {
      console.error('Erro ao deletar cliente', error);
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const visibleRows = useMemo(
    () =>
      stableSort<DataClient>(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rows, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%', }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-center'>
          {`Deseja realmente esse cliente?`}
        </DialogTitle>
        <DialogContent className='p-0 bg-gray-200 !py-2'>
          <DialogContentText id="alert-dialog-description" className='flex items-center justify-center gap-3 text-lg '>
            <AccountCircleIcon className='text-5xl text-gray-500' />
            {`Cliente: ${clientDelete?.nome}`} <br />
            {`Email: ${clientDelete?.email}`}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='flex items-center justify-center gap-3 text-lg'>
            <ReportProblemIcon className='text-yellow-500' fontSize="large" />
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='flex items-center justify-center'>
          <ButtonComponent className='bg-indigo-500 hover:bg-indigo-700 text-white' onClick={handleClose}>Cancelar</ButtonComponent>
          <ButtonComponent className='bg-red-500 hover:bg-red-700 text-white' onClick={handleDeleteClient}>
            Excluir
          </ButtonComponent>
        </DialogActions>
      </Dialog>
      <Paper sx={{ width: '95%', margin: 'auto', mb: 2, height: '100%' }}>
        <Toolbar>
          <Filters />
        </Toolbar>
        {(actionSuccess || actionError )&& (
          <Alert icon={actionError ? <CancelIcon fontSize="inherit" /> : <CheckCircleOutline fontSize="inherit" />} severity={actionError ? 'error' : 'success'} className='flex items-center justify-center text-center text-base'>
            {messageAlertClient}
          </Alert>
        )}
        <TableContainer sx={{ width: '100%', margin: 'auto' }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={(e, property) => handleRequestSort(e, property)}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.nome}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.telefone}</TableCell>
                    <TableCell align="left">{row.coordenada_x}</TableCell>
                    <TableCell align="left">{row.coordenada_y}</TableCell>
                    <TableCell align="left" className='flex items-center'>
                      <TooltipComponent title="Editar" placement="top" onClick={() => handleEditClient(row)}>
                        <EditIcon className="text-gray-400 hover:text-gray-600 transition-all" />
                      </TooltipComponent>
                      <TooltipComponent title="Excluir" placement="top" onClick={() => handleClickOpen(row)}>
                        <TrashIcon className="text-red-300 hover:text-red-500 transition-all" />
                      </TooltipComponent>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Linhas por página"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`;
          }}
          className='bg-gray-200 flex items-center justify-center'
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>
    </Box>
  );
}