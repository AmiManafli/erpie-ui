/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useReducer, useState } from "react";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Modal,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import ProductModal from "./ProductModal";

const reducer = (products, action) => {
  if(action.type === 'add') {
    return [...products, action.product]
  }
  if(action.type === 'remove') {
    return products.filter(product => product.code !== action.product.code)
  }
  if(action.type === 'edit') {
    console.log("before", products);
    console.log("action", action);

    const test = products.map(product => product.code === action.product.code ? (
      {
        code: action.product.code,
        name: action.product.name,
        type: action.product.type,
        supplier: action.product.supplier,
        price: action.product.price,
      }
    ) : product);
    console.log("after: ", test);
    return products.map(product => product.code === action.product.code ? (
      {
        code: action.product.code,
        name: action.product.name,
        type: action.product.type,
        supplier: action.product.supplier,
        price: action.product.price,
      }
    ) : product)
  }
}


const ProductTable = () => {
  const [products, dispatch] = useReducer(reducer, [
    {
      code: "0",
      name: "htx-0201",
      type: "display",
      supplier: "dell",
      price: 100,
    },
    {
      code: "1",
      name: "htx-0202",
      type: "speaker",
      supplier: "hp",
      price: 20,
    }
  ]);

  const addProduct = (product) => {
    dispatch({
      type: "add",
      product: product,
    })
  }

  const editProduct = (product) => {
    console.log("editing: ", product);
    dispatch({
      type: "edit",
      product: product,
    })
  }

  const removeProduct = (product) => {
    dispatch({
      type: "remove",
      product: product,
    })
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Product List</h3>
                <ProductModal onAdd={addProduct} btnText="Add"/>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Supplier</th>
                    <th scope="col">Price per unit</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr>
                      <td>{product.code}</td>
                      <td>{product.name} </td>
                      <td>{product.type}</td>
                      <td>{product.supplier}</td>
                      <td>${product.price}</td>
                      <td>
                        <ProductModal 
                          onAdd={editProduct} 
                          btnText="Edit" 
                          product={product}
                          size="sm"
                          className="btn-icon btn-2"
                          color="secondary"
                          type="button"
                        />
                        {/* <Button className="btn-icon btn-2" color="secondary" type="button" size="sm">
                          Edit
                        </Button> */}

                        <Button 
                          className="btn-icon btn-2" 
                          onClick={() => removeProduct(product)} 
                          color="danger" 
                          type="button" 
                          size="sm"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
      </Container>
    </>
  );
}
export default ProductTable;
