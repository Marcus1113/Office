const tenancy_agreement_fee = 350;
let property_list = {
    "su": {
        "G": [
            { "name": "Shop lot", "price": 20 },
        ],
        "1": [
            { "name": "A1", "price": 480 },
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
            text: value.name
        });
        office_option_element.append(newOption);
    });
}

$('.office-list').change(function (){
    let element = $(this);
    let id = element.attr("id");
    let property = id.replace("-office", "");

    let price = element.val();
    let advance_rental = price;
    let deposit = advance_rental * 2;
    let total_amount = advance_rental + deposit;

    let propertyGroup = $('#' + property);
    propertyGroup.find('.office-price-display').text(price);
    propertyGroup.find('.advance-rental-display').text(advance_rental);
    propertyGroup.find('.total-deposit-amount-display').text(deposit);
    propertyGroup.find('.total-amount-display').text(total_amount);

    // element.closest('#'+property+' .office-price-display').text(price);
    // element.closest('#'+property+' .advance-rental-display').text(advance_rental);
    // element.closest('#'+property+' .total-deposit-amount-display').text(deposit);
    // element.closest('#'+property+' .total-amount-display').text(total_amount);
});


