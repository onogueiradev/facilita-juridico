import { DataClient } from "@/interfaces/DataClient";
import { HeadCell } from "@/interfaces/HeadCell";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

import { TooltipComponent } from "../common";

type Order = 'asc' | 'desc';

type Props = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataClient) => void;
  order: Order;
  orderBy: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'nome',
    label: 'Nome',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'email',
    label: 'Email',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'telefone',
    label: 'Telefone',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'coordenada_x',
    label: 'Cordenada X',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'coordenada_y',
    label: 'Cordenada Y',
    numeric: true,
    disablePadding: false,
  },
  {
    id: 'actions',
    label: 'Ações',
    numeric: true,
    disablePadding: false,
  },
];

export function EnhancedTableHead(props: Props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (event: React.MouseEvent<unknown>, property: keyof DataClient) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow className="p-4">
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={(event) => headCell.id !== 'actions' ? createSortHandler(event, headCell.id) : ''}
            >
              {
                headCell.id !== 'actions'
                  ? <TooltipComponent
                    title={`Ordenar por ${headCell.label}`}
                    placement='top'
                  >
                    {headCell.label}
                  </TooltipComponent>
                  : headCell.label
              }
              {/* {headCell.id !== 'actions' && orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}