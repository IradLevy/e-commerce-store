import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Order } from "../../app/models/order";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
  const subtotal =
    order.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) ?? 0;
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} gutterBottom variant="h4">
          Order# {order.id} - {order.orderStatus}
        </Typography>
        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Back To Orders
        </Button>
      </Box>
      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
      <Grid container>
        <Grid item xs={6}>
          <TableContainer component={Paper} variant={"outlined"}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>Full Name</TableCell>
                  <TableCell align="left">
                    {order.shippingAddress.fullName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Address 1</TableCell>
                  <TableCell align="left">
                    {order.shippingAddress.address1}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Address 2</TableCell>
                  <TableCell align="left">
                    {order.shippingAddress.address2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>City</TableCell>
                  <TableCell align="left">
                    {order.shippingAddress.city}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>State</TableCell>
                  <TableCell align="left">
                    {order.shippingAddress.state}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Zip</TableCell>
                  <TableCell align="left">
                    {order.shippingAddress.zip}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Country</TableCell>
                  <TableCell align="left">
                    {order.shippingAddress.country}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  );
}
