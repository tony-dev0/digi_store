import useFetch from '../../hooks/useFetch';
import XIcon from '@mui/icons-material/X'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import MainCard from '../components/MainCard';
import UniqueVisitorCard from '../components/UniqueVisitorCard';
import MonthlyBarChart from '../components/MonthlyBarChart';
// import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Inventory2Icon from "@mui/icons-material/Inventory2";
// import { totalData } from "../data";
import { TableContainer, Table, TableHead,TableBody, TableRow, TableCell, Paper, CircularProgress } from "@mui/material";
import { useSelector } from 'react-redux';

export default function Overview() {
  let usd = Intl.NumberFormat('en-US', {
    style:'currency',
    currency: 'USD'
  })  
const [totalData, settotalData] = useState<overview[]>([]);
const { users, products } = useSelector((state:any) => state.admin);
const { data, loading } = useFetch("/api/overview");

useEffect(()=>{
  if (!loading){
    settotalData(data);
  }
},[loading])
  return ( 
    <div className="px-3 mt-4">
      <div className="row gap-4 gap-md-0 mb-5">
     {
      loading ? <CircularProgress /> :
      totalData?.map((data:any,i:number) => {
        return  <div className="col-lg-4" key={i}>      
          <Box 
          sx={{
          border: i == 0 ? '2px solid #cef9dd' : i == 1 ? '2px solid #dfdeff' : '2px solid #f0cece', 
          borderRadius:'10px', 
          backgroundColor:'#f2f2f2', 
          boxShadow:'rgba(0,0,0,0.35) 0px 5px 15px'
          }}>
            <div className="px-3 mt-3 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
            <Typography variant="h6"> {data.title}</Typography>
            <Typography sx={{my:2, fontWeight:'bold', fontSize:'22px'}}> {i == 0 ? usd.format(data.value) : data.value}</Typography>
            </div>
            { i == 0 && <RequestQuoteIcon sx={{fontSize: "40px", color:'#619b6d'}} />}
            { i == 1 && <Inventory2Icon sx={{fontSize: "40px", color:'#8280ae'}} />}
            { i == 2 && <ProductionQuantityLimitsIcon sx={{fontSize: "40px", color:'#bd5d5d'}} />}
            </div>
            <hr />
            <Typography sx={{textAlign:'center', marginBottom:'7px'}}>
              {String(data.percent).includes('-') ?
               <span className={"text-danger"}> <ArrowDropDownIcon />
               {String(data.percent).replace('-','')}% &nbsp;
               </span>
               : 
               <span className={"text-success"}> <ArrowDropUpIcon />{data.percent}% &nbsp; </span>
               }
               {data.percentdesc}
            </Typography>
          </Box>
          </div>
      })
     }
      </div> 
<Grid container rowSpacing={4.5} columnSpacing={2.75}>
<Grid size={{ xs: 12, md: 7, lg: 8 }}>
    <UniqueVisitorCard />
</Grid>
<Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h6">Income Overview</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack sx={{ gap: 2 }}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h5">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
</Grid>

      <div className="mt-5 row gap-5 gap-md-0">
        <div className="col-md-6">
          <Typography sx={{fontWeight:'600',marginBottom:'18px',fontSize:"17px"}}>Recent Sign In</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="client table">
              <TableHead>
                <TableRow sx={{ th: { fontWeight: 600, fontSize: "15px" } }}>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  {/* <TableCell align="center">Phone</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody
                // sx={{ "tr:nth-child(even)": { backgroundColor: "#f1f5f9" } }}
                sx={{ "tr:nth-child(odd)": { backgroundColor: "#cfcee6 " } }}
              >
                {users.slice(0,6).map((user:any,i:any) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{i+1}</TableCell>
                      <TableCell align="center">{user.username}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      {/* <TableCell align="center">{user.phone}</TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="col-md-6">
        <Typography sx={{fontWeight:'600',marginBottom:'18px',fontSize:"17px"}}>Latest Products</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="product table">
              <TableHead>
                <TableRow sx={{ th: { fontWeight: 600, fontSize: "15px" } }}>
                  <TableCell align="center">Id</TableCell>
                  {/* <TableCell align="center">Name</TableCell> */}
                  <TableCell align="center">type</TableCell>
                  <TableCell align="center">price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                // sx={{ "tr:nth-child(even)": { backgroundColor: "#f1f5f9" } }}
                sx={{ "tr:nth-child(odd)": { backgroundColor: "#cfcee6 " } }}
              >
                {products.slice(12,18).map((product:any,i:any) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{i+1}</TableCell>
                      {/* <TableCell align="center">{product.name}</TableCell> */}
                      <TableCell align="center">{product.type}</TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
