import React from "react";
import { Card, ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
// product component it displays mask component on Ui
// it has box,pallets input box and add to cart button
export const Product = ({
  mask,
  maskName,
  index,
  onFormEdit,
  addProduct,
  shippingCost,
  renderShippingCost,
}) => {
  return (
    <div>
      <Card style={{ width: "12rem" }}>
        <Card.Img variant="top" src={mask.img} />
        <Card.Body>
          <Card.Title>
            {maskName} ({index + 1})
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Form.Group controlId="validatio">
              <Form.Label>Boxes</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Boxes"
                value={mask.boxes}
                onChange={(e) => onFormEdit("boxes", e.target.value, maskName)}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <Form.Group controlId="validatiom034">
              <Form.Label>Pallets</Form.Label>
              <Form.Control
                required
                type="number"
                max={12}
                placeholder="Pallets"
                value={mask.pallets}
                onChange={(e) =>
                  onFormEdit("pallets", e.target.value, maskName)
                }
              />
            </Form.Group>
          </ListGroupItem>
          {renderShippingCost ? (
            <>
             
            </>
          ) : (
            <ListGroupItem>
              <Button
                disabled={mask.boxes < 200}
                variant="outline-primary"
                onClick={(e) => addProduct(maskName)}
              >
                Add to card
              </Button>
            </ListGroupItem>
          )}
        </ListGroup>
      </Card>
    </div>
  );
};
