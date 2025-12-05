import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

const AdminDashboardHome = () => {

    const axiosSecure=useAxiosSecure()
    const {data:deliveryStatus=[]}=useQuery({
        queryKey:["delivery-status-state"],
        queryFn: async () => {
        const res = await axiosSecure.get(`/parcels/deliveryStatus/state`);
        console.log(res.data);
        return res.data;
    }

    })


    const getPieChartData=(data)=>{
        return data.map(item=>{
            return { name:item?.status, value: item.count}
        })

    }
    return (
        <div  className='my-10'>
             <p className='text-secondary text-2xl font-semibold mb-10'>Admin Dashboard</p>

             {
                deliveryStatus.map((d,i)=><div key={i} className="stats shadow">
  <div className="stat place-items-center">
    <div className="stat-title">{d._id}</div>
    <div className="stat-value">{d.count}</div>
    
  </div>

  
</div>)
             }

             <p className='text-secondary text-2xl font-semibold my-10'>PieChart</p>
             <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={getPieChartData(deliveryStatus)}
        cx="50%"
        cy="100%"
        outerRadius="120%"
        fill="#8884d8"
        label
        isAnimationActive={true}
      />
      <Tooltip />
      <Legend />
    </PieChart>




             
        </div>
    );
};

export default AdminDashboardHome;