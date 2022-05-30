import React from "react";
import { Card, ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
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
                min={200}
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
              {/* <ListGroupItem>
                <div>Shipping Cost</div> {shippingCost} CHF
              </ListGroupItem> */}
              {/* <ListGroupItem>
                <div>Product Cost </div> {mask.boxes * 25} CHF
              </ListGroupItem>
              <ListGroupItem>
                <div>Total Cost </div>
                {shippingCost + mask.boxes * 25} CHF
              </ListGroupItem> */}
            </>
          ) : (
            <ListGroupItem>
              <Button
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
