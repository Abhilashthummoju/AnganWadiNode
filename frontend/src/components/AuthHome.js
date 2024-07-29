import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthHome() {
  const navigate = useNavigate();

  const ImgStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "100px",
    backgroundColor:"#ffffff",
    padding:"20px",
    borderRadius:"30px"
  };

  const LabelStyle = {
    // marginTop: -15,
    marginLeft: 20
  };

  const ImagesConatinr = {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: "200px",
    marginLeft: "-100px"
  };

  const handleLoginClick = (type) => {
    navigate(`/login/${type}`);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px",backgroundColor:"#ffffff",borderRadius:"20px" }}>
        <label style={{
          fontSize: '50px', // Increase font size
          textAlign: 'center',
          fontFamily: 'Times New Roman, Times, serif',
          fontWeight: 'bold',
        }}>SELECT LOGIN TYPE</label>
      </div>
      <div style={ImagesConatinr}>
        <div style={ImgStyle} onClick={() => handleLoginClick('admin')}>
          <img src="/images/admin.png" style={{ width: "200px", height: "200px", cursor: 'pointer' }} alt="Admin" />
          <h1 style={LabelStyle}>Admin</h1>
        </div>
        <div style={ImgStyle} onClick={() => handleLoginClick('children')}>
          <img src="/images/baby.jpg" style={{ width: "200px", height: "200px", cursor: 'pointer' }} alt="Children" />
          <h1 style={LabelStyle}>Children</h1>
        </div>
        <div style={ImgStyle} onClick={() => handleLoginClick('mother')}>
          <img src="/images/mother.png" style={{ width: "200px", height: "200px", cursor: 'pointer' }} alt="Mother" />
          <h1 style={LabelStyle}>Mother</h1>
        </div>
      </div>
    </div>
  );
}

export default AuthHome;
