import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { FaEdit, FaTrash, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Input, Button, Container, Row, Col } from "reactstrap";

const renderToolbar = ({ value }) => {
  let viewButton = (
    <Link className="product-list__button" to={`/product/view/${value}`}>
      <FaSearch className="product-list__button-icon" />
    </Link>
  );

  let editButton = (
    <Link className="product-list__button" to={`/product/update/${value}`}>
      <FaEdit className="product-list__button-icon" />
    </Link>
  );

  let removeButton = (
    <Link className="product-list__button" to={`/product/remove/${value}`}>
      <FaTrash className="product-list__button-icon" />
    </Link>
  );

  return (
    <span>
      {viewButton}
      {editButton}
      {removeButton}
    </span>
  );
};


const RenderPurchase = ({ value: productId }) => {
  let valor;
  let purchaseField = (
    <Container>
      <Col>
        <Row>
          <Col md="9">
            <Input
              label="Cantidad"
              name="productId"
              type="text"
              id="prodId"
              onChange={e => {
                valor = e.target.value
              }}
            />
          </Col>         
          <Col md="3">
            <Link className="product-list__button" 
              onClick={() => {(localStorage.setItem(productId, JSON.stringify({ id: productId, valor })));}}
              to={`/cart`}>
              <FaShoppingCart className="product-list__button-icon" />
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );

  return (
    <span>
      {purchaseField}
    </span>
  );
};

const HeaderComponent = props => {
  return (
    <h2 className="tableHeading">
      {props.title}
    </h2>
  );
};

HeaderComponent.displayName = "HeaderComponent";

const columns = [
  {
    Header: <HeaderComponent title="Nombre" />,
    accessor: "name",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Tipo de producto" />,
    accessor: "category",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Proovedor" />,
    accessor: "providerName",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Compra" />,
    accessor: "id",
    Cell: RenderPurchase
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    Cell: renderToolbar
  }
];

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired
};

RenderPurchase.propTypes = {
  value: PropTypes.string.isRequired
};

export default columns;
