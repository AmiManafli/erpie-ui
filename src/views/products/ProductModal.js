import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, FormGroup, Modal, Label, Input, Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ProductModal = ({onAdd, btnText, product, ...btnProps}) => {
  const [visible, setVisible] = useState(false);
  const [dropDownOpen, setOpen] = useState(false);
  const nameRef = useRef();
  const codeRef = useRef();
  const typeRef = useRef();
  const supplierRef = useRef();
  const priceRef = useRef();


  console.log("product", product);

  const onSave = () => {
    onAdd({
      code: codeRef.current.value,
      name: nameRef.current.value,
      type: typeRef.current.value,
      supplier: supplierRef.current.value,
      price: priceRef.current.value,
    })
    setVisible(false);
  }

  const toggleDropdown = () => setOpen(!dropDownOpen);
  product = product || {};

  return (
    <>
      <Button color="primary" {...btnProps} onClick={() => setVisible(true)}>{btnText}</Button>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={visible}
        toggle={() => setVisible(!visible)}
      >
        <div className="modal-body">
          <Form>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label for="code">Product Code</Label>
                  <Input 
                    type="code" 
                    name="code" 
                    id="code" 
                    placeholder="product code" 
                    innerRef={codeRef}
                    value={product.code}
                  />
                </FormGroup>
              </Col>
              {/* {product.name && ()} */}
              <Col md="6">
                <FormGroup>
                  <Label for="name">Product Name</Label>
                  <Input 
                    type="name" 
                    name="name" 
                    id="name" 
                    placeholder="product name" 
                    innerRef={nameRef}
                  />
                </FormGroup>    
              </Col>  
              <Col md="3">
                <FormGroup>
                  <Label for="exampleSelect">Type</Label>
                    <Input type="select" name="select" id="exampleSelect" innerRef={typeRef}>
                      <option>Product</option>
                      <option>Service</option>
                    </Input>
                </FormGroup>
              </Col>        
            </Row>
            <FormGroup>
              <Label for="supplier">Supplier</Label>
              <Input type="supplier" name="supplier" id="supplier" placeholder="product supplier" innerRef={supplierRef}/>
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="price" name="price" id="price" placeholder="product price" innerRef={priceRef}/>
            </FormGroup>
            <Row style={{paddingLeft: "15px"}}>
              <Button onClick={onSave} color="primary">Save</Button>
              <Button onClick={() => setVisible(!visible)} color="secondary">Cancel</Button>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
}
export default ProductModal;