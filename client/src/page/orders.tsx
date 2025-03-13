import { useState } from 'react'
import {
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    UncontrolledAccordion,
  } from 'reactstrap';

export default function Orders() {
  return (
<div>
    <div className="mtg mb-3" style={{borderBottom:"1px solid #dbd0d0"}}><h3>Orders</h3></div>
      <div className="container" style={{height:"432px", overflowY:"auto"}}>
            <UncontrolledAccordion defaultOpen="1">
            <AccordionItem>
                <AccordionHeader targetId="1">
                Accordion Item 1
                </AccordionHeader>
                <AccordionBody accordionId="1">
                <strong>
                    This is the first item's accordion body.
                </strong>
                You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                <code>
                    .accordion-body
                </code>
                , though the transition does limit overflow.
                </AccordionBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeader targetId="2">
                Accordion Item 2
                </AccordionHeader>
                <AccordionBody accordionId="2">
                <strong>
                    This is the second item's accordion body.
                </strong>
                You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                <code>
                    .accordion-body
                </code>
                , though the transition does limit overflow.
                </AccordionBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeader targetId="3">
                Accordion Item 3
                </AccordionHeader>
                <AccordionBody accordionId="3">
                <strong>
                    This is the third item's accordion body.
                </strong>
                You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                <code>
                    .accordion-body
                </code>
                , though the transition does limit overflow.
                </AccordionBody>
            </AccordionItem>
            </UncontrolledAccordion>
    </div>
</div>
  )
}
