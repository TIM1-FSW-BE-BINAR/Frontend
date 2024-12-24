import React, { useState } from "react";
import NavigationBar from "../../components/Navbar";
import SidebarAccount from "../../components/SidebarAccount";
import { VscArrowLeft } from "react-icons/vsc";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import "./AccountLayout.css";
import Footer from "../../components/Footer";

function PageHeader() {
  return (
    <div>
      <Row className="align-items-center justify-content-center">
        <Col md={10} lg={10} className="text-start">
          <h1 className="mt-4 fw-bold fs-4 title-header text-wrap text-start text-dark">
            Account
          </h1>
        </Col>
      </Row>

      <Row className="align-items-center justify-content-center mt-4">
        <Col md={10} lg={10}>
          <ListGroup>
            <ListGroup.Item
              style={{
                background: "#A06ECE",
                display: "flex",
                height: "3.5rem",
                borderRadius: "15px",
              }}
              className="d-flex justify-content-between align-items-center p-3"
            >
              <Button
                variant="link"
                as={Link}
                to="/"
                className="text-decoration-none d-flex align-items-center"
                style={{ color: "white" }}
              >
                <VscArrowLeft className="me-2" size={20} /> Home
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default function AccountLayout({
  openUserProfil,
  setOpenUserProfil,
  openAccountSetting,
  setOpenAccountSetting,
  children,
}) {
  return (
    <>
      <NavigationBar />
      <Container fluid="xxl">
        <PageHeader />
        <Row className="mt-5 custom-children-all">
          <Col xs={12} md={3}>
            <SidebarAccount
              openUserProfil={openUserProfil}
              setOpenUserProfil={setOpenUserProfil}
              openAccountSetting={openAccountSetting}
              setOpenAccountSetting={setOpenAccountSetting}
            />
          </Col>
          <Col className="custom-children" xs={12} md={9}>
            {children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
