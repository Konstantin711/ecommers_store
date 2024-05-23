import React from 'react';
import LeftBar from '../components/admin_components/LeftBar'
import AdminHeader from '../components/admin_components/AdminHeader'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AdminLayout = ({ children }) => {
  return (
    <div id='adminContainer'>
      <AdminHeader />
      <Row id='adminRow'>
        <LeftBar />
        <Col sm={10} className="mainContent">
          <main>{children}</main>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLayout;