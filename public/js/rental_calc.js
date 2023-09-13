const tenancy_agreement_fee = 350;
const currency = "RM";
let property_list = {
    "su": {
        "G": [
            { "name": "Shop lot", "price": 2500 },
        ],
        "1": [
            { "name": "A1", "price": 10000 },
            { "name": "A2", "price": 480 },
            { "name": "A3", "price": 480 },
            { "name": "A4", "price": 480 },
            { "name": "A5", "price": 480 },
            { "name": "A6", "price": 480 },
        ],
        "2": [
            { "name": "B1", "price": 380 },
            { "name": "B2", "price": 380 },
            { "name": "B3", "price": 380 },
            { "name": "B4", "price": 380 },
            { "name": "B5", "price": 380 },
            { "name": "B7", "price": 380 },
        ],
        "3": [
            { "name": "C1", "price": 580 },
            { "name": "C2", "price": 580 },
            { "name": "C3", "price": 580 },
            { "name": "C4", "price": 580 },
            { "name": "C5", "price": 580 },
            { "name": "C7", "price": 580 },
        ],
    },
    "kj": {
        "1": [
            { "name": "R1", "price": 480 },
            { "name": "R2", "price": 480 },
            { "name": "R3", "price": 480 },
            { "name": "R4", "price": 480 },
            { "name": "R5", "price": 480 },
            { "name": "R6", "price": 480 },
            { "name": "R7", "price": 480 },
            { "name": "R8", "price": 480 },
        ],
    }
};

append_property_floor()

function append_property_floor(){
    $.each(property_list, function(index, value) {
        let property_code = index;
        let property_floors = value;
        let id = property_code + '-floor';
        $.each(property_floors, function(index2, value2) {
            let newOption = $('<option>', {
                value: index2,
                text: "Floor " + index2
            });
            $("#"+id).append(newOption);
        });
    });
}

$('.office-floor-list').change(function (){
    let element = $(this);
    let id = element.attr("id");
    let property = id.replace("-floor", "");
    let default_price = 0;

    let propertyGroup = $('#' + property);
    propertyGroup.find('.office-price-display').text(default_price);
    propertyGroup.find('.advance-rental-display').text(currency + default_price);
    propertyGroup.find('.total-deposit-amount-display').text(currency + default_price);
    propertyGroup.find('.tenancy-agreement-amount-display').text(currency + default_price);
    propertyGroup.find('.total-amount-display').text(currency + default_price);
});

$('.office-list').change(function (){
    let element = $(this);
    let id = element.attr("id");
    let property = id.replace("-office", "");
    let price = element.val();
    let prices = calculate_amount(price);
    display_amount(property, prices['price'], prices['advance_rental'], prices['deposit'], prices['total_amount']);
});

$('.recalculate').click(function (){
    let property = $(this).data("property");
    let propertyGroup = $('#' + property);
    let price =     propertyGroup.find('.nego-price').val();
    let prices = calculate_amount(price);
    display_amount(property, prices['price'], prices['advance_rental'], prices['deposit'], prices['total_amount']);
});

function append_office_list(element){

    let id = $(element).attr("id");
    let selected_floor = $(element).val();
    let property = id.replace("-floor", "");

    let floor_list = property_list[property];
    let office_list = floor_list[selected_floor];
    let office_option_id = property + "-office";
    let office_option_element = $("#"+office_option_id);
    office_option_element.empty(); // Remove existing options

    var newOption = $('<option>', {
        value: "",
        text: "Select office",
        selected: true,
        disabled: true,
    });

    office_option_element.append(newOption);

    $.each(office_list, function(index, value) {
        var newOption = $('<option>', {
            value: value.price,
            text: value.name  + " | RM" +value.price
        });
        office_option_element.append(newOption);
    });
}

function calculate_amount(price){
    let advance_rental = price;
    let deposit = advance_rental * 2;
    let total_amount = Number(advance_rental) + Number(deposit) + Number(tenancy_agreement_fee);

    return {
        'price' : Number(price),
        'advance_rental' : Number(advance_rental),
        'deposit' : Number(deposit),
        'total_amount' : Number(total_amount),
    }
}

function display_amount(property, office_price, advance_rental, deposit, total_amount){

    let propertyGroup = $('#' + property);

    propertyGroup.find('.office-price-display').text(office_price.toLocaleString());
    propertyGroup.find('.advance-rental-display').text(currency + advance_rental.toLocaleString());
    propertyGroup.find('.total-deposit-amount-display').text(currency + deposit.toLocaleString());
    propertyGroup.find('.tenancy-agreement-amount-display').text(currency + tenancy_agreement_fee.toLocaleString());
    propertyGroup.find('.total-amount-display').text(currency + total_amount.toLocaleString());
}