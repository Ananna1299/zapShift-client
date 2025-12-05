import React from 'react';
import { IoIosMenu } from 'react-icons/io';
import { Link, NavLink, Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import { MdManageAccounts, MdOutlineAssignmentReturned } from 'react-icons/md';
import useAuth from '../Hooks/useAuth';
import { FaCreditCard, FaTasks, FaUsers } from 'react-icons/fa';
import { RiMotorbikeFill, RiTaskFill } from 'react-icons/ri';
import useRole from '../Hooks/useRole';

const Dashboard = () => {
  const {user}=useAuth()
  const {role}=useRole()
  console.log(role)
  console.log(user)
    return (
        <div className="drawer lg:drawer-open bg-[#e7e7e7]">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full  justify-between bg-white">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost ">
        {/* Sidebar toggle icon */}
        <IoIosMenu size={30} />
      </label>
      <div className='navbar-end'>
        {
        user && <div className=' flex items-center gap-2 mr-3'>
        <img
                src={user?.photoURL || ""}
                alt="User Photo"
                className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer"
              />
              <span>{user.displayName}</span>

      </div>
      }
      </div>
     
    </nav>
    {/* Page content here */}
   <div className=''>
    <div className='w-11/12 mx-auto '>
     <Outlet></Outlet>
    </div>
    
   </div>
    
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li className="is-drawer-close:hidden">
          <Logo></Logo>
          <p>Menu</p>
        </li>
        <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-[#CAEB66]" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>

       



        

        <li >
          <button className='hover:bg-[#CAEB66]'>
            <MdManageAccounts size={20} />
          <NavLink to="/dashboard/my-parcel" className="is-drawer-close:hidden">My Parcels</NavLink>
          </button>
        </li>

        <li >
          <button className='hover:bg-[#CAEB66]'>
            <FaCreditCard size={20} />
          <NavLink to="/dashboard/payment-history" className="is-drawer-close:hidden">Payment History</NavLink>
          </button>
        </li>


         {/* riders links */}

         <li >
          {
            role.role==="rider" && <>
            <button className='hover:bg-[#CAEB66]'>
             <FaTasks size={20}/>
          <NavLink to="/dashboard/assigned-task" className="is-drawer-close:hidden">Assigned Tasks</NavLink>
          </button></>
          }
          
        </li>

        <li >
          {
            role.role==="rider" && <>
            <button className='hover:bg-[#CAEB66]'>
              <RiTaskFill size={20}/>
          <NavLink to="/dashboard/completed-deliveries" className="is-drawer-close:hidden">Completed Deliveries</NavLink>
          </button></>
          }
          
        </li>

        {/* admin links */}
        <li >
          { role.role==="admin" && <>
          <button className='hover:bg-[#CAEB66]'>
           <RiMotorbikeFill size={20} />
          <NavLink to="/dashboard/approve-riders" className="is-drawer-close:hidden">Approve Riders</NavLink>
          </button>
          </>

          }
          
        </li>

         <li >
          { role.role==="admin" && <>
          <button className='hover:bg-[#CAEB66]'>
            <MdOutlineAssignmentReturned size={20} />
          <NavLink to="/dashboard/assign-riders" className="is-drawer-close:hidden">Assign Riders</NavLink>
          </button>
          </>

          }
          
        </li>

        { role.role==="admin" && <>
        <li >
          <button className='hover:bg-[#CAEB66]'>
            <FaUsers  size={20}/>
          <NavLink to="/dashboard/manage-users" className="is-drawer-close:hidden">Manage Users</NavLink>
          </button>
        </li>
        </>
          
        }

        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default Dashboard;