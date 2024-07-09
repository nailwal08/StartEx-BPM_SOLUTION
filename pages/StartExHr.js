import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

const HrPage = () => {
  const [queries, setQueries] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQueries = async () => {
      const res = await fetch('/api/startExQuery?assignto=hr');
      const data = await res.json();
      setQueries(data);
    };

    const fetchUsers = async () => {
      const res = await fetch('/api/startExUsers');
      const data = await res.json();
      setUsers(data);
    };

    fetchQueries();
    fetchUsers();
  }, []);

  const handleResolve = async (id) => {
    const res = await fetch('/api/startExQuery', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      toast.success('Query resolved', {
        position: 'top-right'
      });
      setQueries(queries.filter((query) => query._id !== id));
    } else {
      toast.error('Failed to resolve query', {
        position: 'top-right'
      });
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/startEx');
  };

  return (
    <>
    <style jsx global>{`
       html, body {
         margin: 0;
         padding: 0;
         width: 100%;
         height: 100%;
         background-color: #F0E8E6;
         overflow-x: hidden; 
       }
       * {
         box-sizing: border-box; 
       }
      .navbar {
 top: 0;
 left: 0;
 width: 100%;
 background: #E6F0ED;
 position: fixed;
 display: flex;
 justify-content: space-between;
 align-items: center;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
 padding: 0 20px; 
}

.navbar-left {
 margin-left: 20px;
 color:#9B5E4E;
}

.navbar-right {
margin-top: -5px;
 margin-right: 20px;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
}

.logout-btn {
margin-top: -5px;
 border: 1px solid black;
 padding: 2px 8px; 
 border-radius: 5px;
 background: #F5552D;
 color: white;
 cursor: pointer;
 margin-bottom: 10px; 
}

.logout-btn:hover {
 background: #C0FB79;
 color: black;
}

       .content {
         margin-top: 60px; 
         padding: 20px;
       }
       .headings{
       text-align: center;
         color: #333;
       }
table {
         margin: 0 auto; 
         border-collapse: separate;
         width: 75%; 
         background-color: white; 
         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); 
         margin-bottom: 40px;
         border-radius: 5px;
       }
       th, td {
         padding: 12px; 
         text-align: center; 
         border-bottom: 1px solid #ddd; 
       }
       th {
         background-color: #E9E6F0; 
         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
       }
       tr:hover {
         background-color: #F0EFE6; 
       }
        .finance {
         text-align: center;
       }
       .finance > * {
         margin: 0 10px;
       }
         
       input {
         width: 20%;
         padding: 10px;
         margin-bottom: 20px;
         border: 1px solid #ccc;
         border-radius: 5px;
         box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
       }
       button {
       border: 1px solid #0070f3;
         padding: 6px 20px;
         border-radius: 5px;
         background: #E6F0ED;
         color: black;
         cursor: pointer;
       }
       button:hover {
         border: 1px solid black;
         background: #C0FB79;
       }
        
     .chart-container {
 width: 50%;
 max-width: 300px; 
 margin: 0 auto; 
 padding: 20px;
 
}

.chart-container canvas {
 display: block;
 width: 100%;
}
 .profit-loss-box {
 display: inline-block;
 border-radius: 3px;
 margin-left: 10px;
}

.profit {
 background-color: #4caf50;
}

.loss {
 background-color: #f44336; 
}
       
     `}</style>
     <Head>
       <title>StartEx | HR</title>
     </Head>
     <div className="navbar">
       <h2 className="navbar-left">Welcome HR</h2>
       <div className="navbar-right">
         <p>StartEx: The Ultimate BPM Solution</p>
         <button className="logout-btn" onClick={handleLogout}>Logout</button>
       </div>
     </div>
     <div className="content">
     <h2 className="headings">Registered Users</h2>
     <table>
       <thead>
         <tr>
           <th>Name</th>
           <th>Department</th>
           <th>Role</th>
         </tr>
       </thead>
       <tbody>
         {users.map((user) => (
           <tr key={user._id}>
             <td>{user.name}</td>
             <td>{user.department}</td>
             <td>{user.role}</td>
           </tr>
         ))}
       </tbody>
     </table>
      <h2 className="headings">HR Queries</h2>
      <table>
          <thead>
            <tr>
              <th>Query</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query._id}>
                <td>{query.name}</td>
                <td>{query.query}</td>
                <td><button onClick={() => handleResolve(query._id)}>Resolved</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>   
  );
};

export default HrPage;