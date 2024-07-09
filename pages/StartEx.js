import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { useEffect } from 'react';

const UserForm = () => {

  const [showHeading, setShowHeading] = useState(false);
  useEffect(() => {
    const carElement = document.querySelector('.car');
    carElement.style.animation = 'moveCar 6s linear forwards';

    const handleAnimationEnd = () => {
      setShowHeading(true);
    };

    carElement.addEventListener('animationend', handleAnimationEnd);

    return () => {
      carElement.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/startExUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, department }),
    });

    if (res.ok) {
      const data = await res.json();
      toast.success('User found! Redirecting...', {
        position: 'top-right'
      });

      setTimeout(() => {
        if (data.role === 'admin') {
          router.push('/startExAdmin');
        } else if (data.role === 'finance') {
          router.push('/startExFinance');
        } else if (data.role === 'hr') {
          router.push('/startExHr');
        } else {
          toast.info(`User found with role: ${data.role}`, {
            position: 'top-right'
          });
        }
      }, 1500);
    } else {
      toast.error('User not found!', {
        position: 'top-right'
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
           background: url('/clouds.jpg') no-repeat center center fixed; 
          background-size: cover;
        }
        @keyframes moveCar {
          0% { left: -150px; opacity: 1; }
          80% { left: calc(50vw); opacity: 1; }
          100% { left: calc(70vw); opacity: 0; }
          
        }
        .car {
          position: absolute;
          top: 10px;
          left: -150px;
          width: 300px;
          height: auto;
        }
        .heading {
          position: absolute;
          top: 20px;
          left: 40px;
          font-size: 40px;
          color: black;
        }
        .subHeading {
          font-size: 30px;
          display: block;
          margin-top: -5px; 
        }
        .background-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          opacity: 0.8;
        }
        form {
          height: auto;
          width: 30vw;
          background: rgba(255, 255, 255, 0.8);
          padding: 30px;
          border-radius: 7px;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
        }
        label {
          display: block;
          margin-bottom: 10px;
          margin-left: 45px;
          font-weight: bold;
        }
        input {
          width: 70%;
          padding: 10px;
          margin-left: 45px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
        }
        button {
        border: 1px solid #0070f3;
        margin-left: 150px;
          padding: 10px 20px;
          border-radius: 5px;
          background: #0070f3;
          color: white;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          border: 1px solid black;
          background: #005bb5;
        }
        .footer {
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          color: black;
        }
      `}</style>
      <Head>
        <title>StartEx | Home</title>
      </Head>
      <video autoPlay loop muted className="background-video">
        <source src="/clouds.mp4" type="video/mp4" />
      </video>
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src="/plane.png" alt="Toy plane" className="car" />
        {showHeading &&
          <div className="heading">
            StartEx :
            <span className="subHeading">The ultimate BPM solution</span>
          </div>}
        <form onSubmit={handleSubmit}>
          <div >
            <label htmlFor="name" >Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div >
            <label htmlFor="department" >Department:</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
      <div className="footer">
        © 2024 StartEx. All rights reserved.
      </div>
    </>
  );
};

export default UserForm;
