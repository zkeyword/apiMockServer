FORMAT: 1A

# Attributes API
This API example demonstrates how to describe body attributes of a request or
response message.

In this case, the description is complementary (and duplicate!) to the provided
JSON example in the body section. The 
[Advanced Attributes](09.%20Advanced%20Attributes.md) API example will
demonstrate how to avoid duplicates and how to reuse attribute descriptions.


# Group Coupons

## Coupon [/coupons/{id}]
A coupon contains information about a percent-off or amount-off discount you
might want to apply to a customer.

### Retrieve a Coupon [GET]
Retrieves the coupon with the given ID.

+ Response 200 (application/json)

    + Attributes (object)
        + id: 250FF (string, required)
        + created: 1415203908 (number) - Time stamp
        + percent_off: 25 (number)

            A positive integer between 1 and 100 that represents the discount
            the coupon will apply.

        + redeem_by (number) - Date after which the coupon can no longer be redeemed

    + Body

            {
                "id": "250FF",
                "created": 1415203908,
                "percent_off": 25,
                "redeem_by": null
            }