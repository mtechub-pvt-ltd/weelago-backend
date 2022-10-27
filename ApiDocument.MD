## API Details

BaseURL: http://localhost:8080 (Local Server)
BaseURL: https://mtechub-weelago.herokuapp.com (Deployed Server)

## ##################################### Users

## SignUp

    URL: /api/user/signup  (Post)
    @Access Public

    -Request :It need
                    UserName*(String)
                    Email*(String)
                    Password*(String)
                    PhoneNumber*(String)
                    DateOfBirth*(Date)
                    Address*(String)
                    image*(file)
                    Role*(Enum)['Admin', 'Driver','Customer'] - by default its "Customer"

    -Response : And you get success,message ,Record

## Login

    URL: /api/user/signup  (Post)
    @Access Public

    -Request :It need
                    Email*(String)
                    Password*(String)

    -Response : And you get success,message,token,Record

## GetAllDrivers

    URL: /api/user/GetAllDrivers  (Get)
    @Access Public

    -Response : And you get success,message,Record

## Update

    URL: /api/user/signup  (Post)
    @Access Public

    -Request :It need
                    Email*(String)
                    UserName(String)
                    Password(String)
                    PhoneNumber(String)
                    DateOfBirth(Date)
                    Address(String)
                    image(file)
    ---> ("Email is must & rest of the data needs to be enter accordingly that user want to update")
    -Response : And you get success,message

## ##################################### Categories

## Add New Category

    URL: /api/Categories/Add  (Post)
    @Access Public

    -Request :It need
                    Name*(String)
                    image*(file)

    -Response : And you get success,message ,Record

## update Category Image

    URL: /api/Categories/update  (Post)
    @Access Public

    -Request :It need
                    Name*(String)
                    image*(file)

    -Response : And you get success,message

## GetAll Categories

    URL: /api/Categories/GetAll  (Get)
    @Access Public

    -Response : And you get success,message,Data

## GetOne Category

## ##################################### Items

## Add New Item

    URL: /api/Item/Add  (Post)
    @Access Public

    -Request :It need
                    Name*(String)
                    image*(file)
                    Price*(Number)
                    Description*(String)
                    Category*(String)
                    BrandName*(String)

    -Response : And you get success,message ,Record

## Update Item

    URL: /api/Item/update  (Post)
    @Access Public

    -Request :It need
                    Name*(String)
                    image(file)
                    Price(Number)
                    Description(String)
                    BrandName(String)
    ---> ("Name is must & rest of the data needs to be enter accordingly that user want to update")
    -Response : And you get success,message

## Delete Item

    URL: /api/Item/delete  (Post)
    @Access Public

    -Request :It need
                    Name*(String)
    -Response : And you get success,message

## Add Offer on An Item

    URL: /api/Item/update  (Post)
    @Access Public

    -Request :It need
                    Name*(String)
                    Deal*(Boolean) - True
                    DealName*(String)
                    DealPrice*(Number)
                    DealDescription*(String)
    -Response : And you get success,message

## End Offer from An Item

    URL: /api/Item/update  (Post)
    @Access Public

    -Request :It need
                    Name*(String)
                    Deal*(Boolean) - false
    -Response : And you get success,message

## GetAll Items

    URL: /api/Item/GetAll  (Get)
    @Access Public

    -Response : And you get success,message, Record

## GetOne Item By Name/Brand

    URL: /api/Item/GetOne  (Post)
    @Access Public

    -Request :It need
                    Name*(String) ||  BrandName*(String)
    ->If you want to search item by name just pass the Name key with its value vice versa with BrandName
    -Response : And you get success,message,Data

## GetDealItem Items

    URL: /api/Item/GetDealItem  (Get)
    @Access Public

    -Response : And you get success,message, Record

## ##################################### Orders

## Add Order

    URL: /api/order/add  (Post)
    @Access Public

    -Request :It need
                    Email*(String)
                    TotalPrice*(Number)
                    PaymentMethod*(Enum)['CreditCard', 'Cash','PayPal']
                    Items*(Array of Mongodb-ID of items)

    -Response : And you get success,message ,Record

## Get All Orders

    URL: /api/order/GetAll  (Get)
    @Access Public

    -Response : And you get success,message ,Record

## Get All Orders of a specific User

    URL: /api/order/GetOrdersByUser  (Post)
    @Access Public

    -Request :It need
                    Email*(String)

    -Response : And you get success,message ,Record

## Get All Orders on the search criteria of Status if it is Pending, Approved or Delivered

    URL: /api/order/GetOrderByStatus  (Post)
    @Access Public

    -Request :It need
                    Status*(Enum) ['Pending', 'Approved', 'Delivered']

    -Response : And you get success,message ,Record

## Assign Driver to Order

    URL: /api/order/AssignDriver  (Post)
    @Access Public

    -Request :It need
                    OrderId*(MongoDB-ID of Order)
                    DriverId*(MongoDB-ID of Driver)

    -Response : And you get success,message ,Record

## update status Of Order

    URL: /api/order/UpdateStatus (Post)
    @Access Public

    -Request :It need
                    OrderId*(MongoDB-ID of Order)
                    Status*(Enum) ['Pending', 'Approved', 'Delivered']

    -Response : And you get success,message

## ##################################### Payment
## To Charge Stripe Payment
    URL: /api/payment/stripe (Post)
    @Access Public

    -Request :It need
                    Email(String)
                    Name(String)
                    Amount(Number)
                    CardNumber(Number)
                    ExpMM(two digit month)
                    ExpYY(two digit year)
                    CVV(number)

    -Response : And you get success,message

## ##################################### Promotions

## To Add new Promotion
    URL: /api/promotions/add (Post)
    @Access Public

    -Request :It need
                    Name(String)
                    image(file/picture/pdf)

    -Response : And you get success,message,Record

## To Delete Promotion
    URL: /api/promotions/delete (Post)
    @Access Public

    -Request :It need
                    PromotionId(MongoDb-ID)

    -Response : And you get success,message

    
## To getall Promotion
    URL: /api/promotions/getall (Get)
    @Access Public

    -Response : And you get success,message,Record