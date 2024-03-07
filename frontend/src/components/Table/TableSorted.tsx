'use client';
import React, { useMemo, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Toolbar, Paper, Tooltip } from '@mui/material';
import { Visibility } from '@mui/icons-material';

import { Filters } from '../Filters/Filters';
import { EnhancedTableHead } from './EnhancedTableHead';

import { useStore } from '@/store/store';
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
  const { rowsInitial, newRows } = useStore();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof DataClient>('nome');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = (newRows.length > 0 ? newRows : rowsInitial)?.map((row) => createData(row.id || 0, row.nome, row.email, row.telefone, row.coordenada_x, row.coordenada_y));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataClient,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClickView = (event: React.MouseEvent<unknown>, id: number) => {
    // console.log(id, 'id')
  };

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
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '90%', margin: 'auto', mb: 2 }}>
        <Toolbar>
          <Filters />
        </Toolbar>
        <TableContainer sx={{ width: '100%', margin: 'auto' }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
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
                    <TableCell align="left">
                      <Tooltip title="Ver Detalhes" onClick={(event) => handleClickView(event, row.id || 0)}>
                        <Visibility className="text-gray-400" />
                      </Tooltip>
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}