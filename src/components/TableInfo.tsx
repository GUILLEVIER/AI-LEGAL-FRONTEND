import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material'
import { StarOutlined, StarBorderOutlined } from '@mui/icons-material'
import { TableHeadCell } from '@/assets/styles/style'

const TableInfo = ({
  data,
  headData,
  resourceType,
  actionButtons,
  handleToggleFavorite,
}) => {
  return (
    <>
      {data.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small'>
            <TableHead>
              <TableRow>
                {headData.map((head: any) => (
                  <TableHeadCell align='center'>{head.title}</TableHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data: any, key: number) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {resourceType === 'user' ? (
                    <>
                      <TableCell component='th' scope='row' align='center'>
                        {data.userName}
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        {data.email}
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 1,
                          }}
                        >
                          {actionButtons.map((button, index) => (
                            <Button
                              key={index}
                              color={button.color}
                              variant={button.variant}
                              fullWidth={button.fullWidth}
                              size={button.size}
                              onClick={() => button.onClick(data)}
                            >
                              {button.icon}
                            </Button>
                          ))}
                        </Box>
                      </TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                  {resourceType === 'template' ? (
                    <>
                      <TableCell component='th' scope='row' align='center'>
                        <Tooltip
                          title={
                            data.es_favorito
                              ? 'Quitar de favoritos'
                              : 'Agregar a favoritos'
                          }
                        >
                          <IconButton
                            size='small'
                            onClick={() => handleToggleFavorite?.(data.id)}
                            sx={{
                              color: data.es_favorito
                                ? '#ffd700'
                                : 'text.secondary',
                            }}
                          >
                            {data.es_favorito ? (
                              <StarOutlined />
                            ) : (
                              <StarBorderOutlined />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        {data.nombre}
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        {data.tipo.nombre}
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        {}
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        {}
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        <Tooltip title={data.descripcion}>
                          <Typography
                            sx={{
                              maxWidth: '200px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {data.descripcion}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 1,
                          }}
                        >
                          {actionButtons.map((button, index) => (
                            <Button
                              key={index}
                              color={button.color}
                              variant={button.variant}
                              fullWidth={button.fullWidth}
                              size={button.size}
                              onClick={() => button.onClick(data)}
                            >
                              {button.icon}
                            </Button>
                          ))}
                        </Box>
                      </TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          gutterBottom
          sx={{ textAlign: 'center' }}
          variant='subtitle1'
        >
          No existen datos
        </Typography>
      )}
    </>
  )
}
export default TableInfo
