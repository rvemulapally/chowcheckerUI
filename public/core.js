var chowcheckerUI = angular.module('chowcheckerUI', ['ui.bootstrap', 'ui.bootstrap.tpls']);
chowcheckerUI.controller('mainController', mainController);
chowcheckerUI.run(function($http) {
  $http.defaults.headers.common.apiKey = 'Y2hvd2NoZWNrZXIyMDE1';
});
chowcheckerUI.config(function ( $httpProvider) {        
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

var baseApiUrl = "https://aqueous-coast-7114.herokuapp.com";

function mainController($scope, $http, $uibModal) {
    $scope.ages = ["Puppy", "Adult", "Senior"];
    $scope.results;
    $scope.searchResults;
    $scope.searchIngredient = '';
    $scope.autoSearchIngredients = ['Search','Duck','Meat','Chicken','Fish','Lamb'];

    $scope.results = sample;
    fixIngredients($scope.results);

    $http.get(baseApiUrl + '/breeds')
        .success(function(data) {
            $scope.breeds = data.list;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.doSubmit = function() {
        $http.post(baseApiUrl + '/collection/filter', {
            name: "dogs",
            query: "AgeCategory: \"" + $scope.selectedAge + "\""
        }).success(function(data) {
            $scope.results = data.results;
            console.log(data);
        }).error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.showIngredients = function(model, index) {
        console.log('Product selected:', model[index]);
        var product = model[index];
        $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                product: function () {
                  return product;
                }
            }
        });
    }

    $scope.searchForIngredient = function(searchIngredient) {
        if(!searchIngredient.trim() || searchIngredient == 'Search') return;
        var searchIngredient = searchIngredient.toLowerCase();
        var results = JSON.parse(JSON.stringify($scope.results));
        var searchResults = [];
        for(var i in results) {
            var result = results[i];
            if(typeof result.Ingredients != 'string') {
                result.Ingredients = JSON.stringify(result.Ingredients);
            }
            if(result.Ingredients.toLowerCase().indexOf(searchIngredient) > -1) {
                searchResults.push(result);
            }
        }
        console.log(searchResults.length + ' searchResults for ' + searchIngredient, searchResults);
        $scope.searchResults = searchResults;
        fixIngredients($scope.searchResults);
    }

    $scope.autoSearch = function(ingredient) {
        console.log('AutoSearch for:', ingredient);
        $scope.searchIngredient = ingredient;
        $scope.searchForIngredient(ingredient);
    }

    $scope.clear = function() {
        $scope.results = null;
        $scope.searchResults = null;
        $scope.searchIngredient='';
        $scope.autoSearchIngredient = 'Search';
    }

    $scope.clearSearch = function() {
        $scope.searchResults = null; 
        $scope.searchIngredient = '';
        $scope.autoSearchIngredient = 'Search';
    }
}

chowcheckerUI.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, product) {
    try {
        product.Ingredients = JSON.parse(product.Ingredients);
    } catch(e) {}
    $scope.selected = product;

    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

chowcheckerUI.controller('NavBarCtrl', function($scope) {
    $scope.isCollapsed = true;
});

chowcheckerUI.controller('DropdownCtrl', function ($scope, $log) {
  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});

function fixIngredients(results) {
    for(var i in results) {
        try {
         results[i].Ingredients = JSON.parse(results[i].Ingredients);
        } catch(e) {}
        
    }
}

var sample = [
        {
            "Brand": "Solid Gold",
            "Manufacturer": "Solid Gold",
            "LogoLink": "http://justtocusmile.tripod.com/sitebuildercontent/sitebuilderpictures/sg.gif",
            "Product": "Mmillennia - Adult Dog Food",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Dry",
            "Ingredients": "[\"Beef\", \"Ocean Fish Meal\", \"Cracked Pearled Barley\", \"Brown Rice\", \"Peas\", \"Dried Eggs\", \"Canola Oil (preserved with mixed tocopherols)\", \"Rice Bran\", \"Tomato Pomace\", \"Flaxseed\", \"Natural Flavor\", \"Potassium Chloride\", \"Choline Chloride\", \"Salmon Oil (source of DHA)\", \"Dried Chicory Root\", \"Taurine\", \"dl-methionine\", \"Parsley Flakes\", \"Pumpkin Meal\", \"Almond Oil (preserved with mixed tocopherols)\", \"Sesame Oil (preserved by mixed tocopherols)\", \"Yucca Schidigera Extract\", \"Thyme\", \"Blueberries\", \"Cranberries\", \"Carrots\", \"Broccoli\", \"Vitamin A Supplement\", \"Vitamin D3 Supplement\", \"Vitamin E Supplement\", \"Zinc Sulfate\", \"Ferrous Sulfate\", \"Niacin\", \"Calcium Sulfate\", \"Riboflavin\", \"Copper Sulfate\", \"Pyridoxine Hydrochloride\", \"Thiamine Mononitrate\", \"Manganese Sulfate\", \"Zinc Proteinate\", \"Manganese Proteinate\", \"Copper Proteinate\", \"Calcium Iodate\", \"Cobalt Carbonate\", \"Folic Acid\", \"Sodium Selenite\", \"Biotin\", \"Vitamin B12 Supplement\", \"Rosemary Extract\"]",
            "Arginine(min.)": " ",
            "Omega": "[\"All-natural ingredients\"]",
            "Protease*(AspergillusOryzae) ": "[\"Total Health\"]",
            "Amylase* (Aspergillus oryzae) ": "[\"Beef\", \"Fish\", \"Barley\"]",
            "Cellulase*(TrichodermaReesei)": "http://www.solidgoldpet.com/productDetail.aspx?p=8",
            "Hemicellulase*(TrichodermaReesei)": "http://www.solidgoldpet.com/images/products/dry/MMillennia-15lbs.jpg",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        },
        {
            "Brand": "Solid Gold",
            "Manufacturer": "Solid Gold",
            "LogoLink": "http://justtocusmile.tripod.com/sitebuildercontent/sitebuilderpictures/sg.gif",
            "Product": "Green Cow Tripe - Grain and Gluten Free Canned Dog Food",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Can",
            "Ingredients": "[\"Green Beef Tripe\", \"Beef Broth\", \"Olive Oil\", \"Potatoes\", \"Dicalcium Phosphate\", \"Calcium Carbonate\", \"Guar Gum\", \"Carrageenan\", \"Cassia Gum\", \"Potassium Chloride\", \"Salt\", \"Choline Chloride\", \"Iron Proteinate\", \"Zinc Proteinate\", \"Vitamin E Supplement\", \"Copper Proteinate\", \"Manganese Proteinate\", \"Riboflavin Supplement\", \"Sodium Selenite\", \"Calcium Iodate\", \"Thiamine Mononitrate\", \"Vitamin A Supplement\", \"Vitamin B12 Supplement\", \"Potassium Iodide\", \"Biotin\", \"Vitamin D3 Supplement\"]",
            "Arginine(min.)": " ",
            "Omega": "[\"The sole diet\"]",
            "Protease*(AspergillusOryzae) ": "",
            "Amylase* (Aspergillus oryzae) ": "[\"Beef\"]",
            "Cellulase*(TrichodermaReesei)": "http://www.solidgoldpet.com/productDetail.aspx?p=17",
            "Hemicellulase*(TrichodermaReesei)": "http://www.solidgoldpet.com/images/products/canned/Dog-Food-Can-Green-Cow.jpg",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        },
        {
            "Brand": "Iams® ProActive Health™",
            "Manufacturer": "Iams",
            "LogoLink": "http://www.zeiglersdist.com/images/products/All-Logos/LogoIams.gif",
            "Product": "Adult Chunks with Chicken and Vegetables in Gravy",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Can",
            "Ingredients": "[\"Water\", \"Chicken\", \"Meat By-Products\", \"Chicken By-Products\", \"Corn Starch\", \"Carrots\", \"Guar Gum\", \"Flaxseed Meal\", \"Potatoes\", \"Peas\", \"Salt\", \"Dried Egg Product\", \"Potassium Chloride\", \"Natural Flavor\", \"Sodium Tripolyphosphate\", \"Calcium Carbonate\", \"Added Color\", \"Vitamins (Vitamin E Supplement\", \"Ascorbic Acid\", \"Thiamine Mononitrate (source of Vitamin B1)\", \"D-Calcium Pantothenate\", \"Vitamin B12 Supplement\", \"Niacin\", \"Riboflavin Supplement (source of Vitamin B2)\", \"Biotin\", \"Inositol\", \"Pyridoxine Hydrochloride (source of Vitamin B6)\", \"Vitamin D3 Supplement\", \"Folic Acid)\", \"Choline Chloride\", \"Minerals (Ferrous Sulfate\", \"Zinc Oxide\", \"Manganese Sulfate\", \"Copper Sulfate\", \"Manganous Oxide\", \"Potassium Iodide\", \"Cobalt Carbonate)\", \"Vegetable Oil\", \"Fructooligosaccharides\"]",
            "Arginine(min.)": "[\"10 lbs.  3/4 - 1 can\", \"30 lbs.  1 1/4 - 1 1/2 cans\", \"40 lbs.  1 3/4 - 1 3/4 cans\", \"60 lbs.  2 1/4 - 2 1/2 cans\", \"80 lbs.  2 1/2 - 3 cans\", \"100 lbs.  3 - 3 1/4 cans\"]",
            "Omega": "[\"Natural ingredients slow-cooked\", \"Added vitamins and minerals\"]",
            "Protease*(AspergillusOryzae) ": "[\"Healthy body\"]",
            "Amylase* (Aspergillus oryzae) ": "[\"Natural Flavor\", \"Chicken\"]",
            "Cellulase*(TrichodermaReesei)": "http://www.iams.com/dog-food/iams-proactive-health-adult-chunks-with-chicken-and-vegetables-in-gravy",
            "Hemicellulase*(TrichodermaReesei)": "http://media.iams.com/en_us/data_root/_images/dog/products/pah_d_chunkschickenveg_lg.jpg",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        },
        {
            "Brand": "Iams® ProActive Health™",
            "Manufacturer": "Iams",
            "LogoLink": "http://www.zeiglersdist.com/images/products/All-Logos/LogoIams.gif",
            "Product": "Adult Ground Dinner with Turkey and Rice",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Can",
            "Ingredients": "[\"Water\", \"Chicken\", \"Meat By-Products\", \"Chicken By-Products\", \"Turkey\", \"Ground Rice\", \"Dried Egg Product\", \"Carrageenan\", \"Flaxseed Meal\", \"Cassia Gum\", \"Potassium Chloride\", \"Calcium Sulfate\", \"Added Color\", \"Sodium Tripolphosphate\", \"Brewers Dried Yeast\", \"Vitamins (Vitamin E Supplement\", \"Ascorbic Acid\", \"Thiamine Mononitrate (source of Vitamin B1)\", \"D-Calcium Pantothenate\", \"Biotin\", \"Vitamin B12 Supplement\", \"Vitamin A Acetate\", \"Niacin\", \"Riboflavin Supplement (source of Vitamin B2)\", \"Inositol\", \"Pyridoxine Hydrochloride (source of Vitamin B6)\", \"Vitamin D3 Supplement\", \"Folic Acid)\", \"Salt\", \"Choline Chloride\", \"Minerals (Ferrous Sulfate\", \"Zinc Oxide\", \"Manganese Sulfate\", \"Copper Sulfate\", \"Manganous Oxide\", \"Potassium Iodide\", \"Cobalt Carbonate)\", \"Fructooligosaccharides\"]",
            "Arginine(min.)": "[\"10 lbs.  3/4 - 1 can\", \"30 lbs.  1 1/4 - 1 1/2 cans\", \"40 lbs.  1 3/4 - 1 3/4 cans\", \"60 lbs.  2 1/4 - 2 1/2 cans\", \"80 lbs.  2 1/2 - 3 cans\", \"100 lbs.  3 - 3 1/4 cans\"]",
            "Omega": "[\"Natural ingredients slow-cooked\", \"Added vitamins and minerals\"]",
            "Protease*(AspergillusOryzae) ": "[\"Healthy body\"]",
            "Amylase* (Aspergillus oryzae) ": "[\"Chicken\", \"Turkey\"]",
            "Cellulase*(TrichodermaReesei)": "http://www.iams.com/dog-food/iams-proactive-health-adult-ground-dinner-with-turkey-and-rice",
            "Hemicellulase*(TrichodermaReesei)": "http://media.iams.com/en_us/data_root/_images/dog/products/pah_d_groundturkeyrice_lg.jpg",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        },
        {
            "Brand": "Iams® ProActive Health™",
            "Manufacturer": "Iams",
            "LogoLink": "http://www.zeiglersdist.com/images/products/All-Logos/LogoIams.gif",
            "Product": "Adult Ground Dinner with Lamb and Rice",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Can",
            "Ingredients": "[\"Water\", \"Chicken\", \"Meat By-Products\", \"Chicken By-Products\", \"Lamb\", \"Ground Rice\", \"Dried Egg Product\", \"Carrageenan\", \"Flaxseed Meal\", \"Cassia Gum\", \"Potassium Chloride\", \"Calcium Sulfate\", \"Sodium Tripolphosphate\", \"Brewers Dried Yeast\", \"Vitamins (Vitamin E Supplement\", \"Ascorbic Acid\", \"Thiamine Mononitrate (source Of Vitamin B1)\", \"D-Calcium Pantothenate\", \"Biotin\", \"Vitamin B12 Supplement\", \"Vitamin A Acetate\", \"Niacin\", \"Riboflavin Supplement (Source Of Vitamin B2)\", \"Inositol\", \"Pyridoxine Hydrochloride (source Of Vitamin B6)\", \"Vitamin D3 Supplement\", \"Folic Acid)\", \"Added Color\", \"Salt\", \"Choline Chloride\", \"Minerals (Ferrous Sulfate\", \"Zinc Oxide\", \"Manganese Sulfate\", \"Copper Sulfate\", \"Manganous Oxide\", \"Potassium Iodide\", \"Cobalt Carbonate)\", \"Fructooligosaccharides\"]",
            "Arginine(min.)": "[\"10 lbs.  3/4 - 1 can\", \"30 lbs.  1 1/4 - 1 1/2 cans\", \"40 lbs.  1 3/4 - 1 3/4 cans\", \"60 lbs.  2 1/4 - 2 1/2 cans\", \"80 lbs.  2 1/2 - 3 cans\", \"100 lbs.  3 - 3 1/4 cans\"]",
            "Omega": "['Natural ingredients slow-cooked\", \"Added vitamins and minerals\"]",
            "Protease*(AspergillusOryzae) ": "[\"Healthy body\"]",
            "Amylase* (Aspergillus oryzae) ": "[\"Chicken\", \"Lamb\"]",
            "Cellulase*(TrichodermaReesei)": "http://www.iams.com/dog-food/iams-proactive-health-adult-ground-dinner-with-lamb-and-rice",
            "Hemicellulase*(TrichodermaReesei)": "http://media.iams.com/en_us/data_root/_images/dog/products/pah_d_groundlambrice_lg.jpg",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        },
        {
            "Brand": "Iams® Grain Free Naturals™",
            "Manufacturer": "Iams",
            "LogoLink": "http://www.zeiglersdist.com/images/products/All-Logos/LogoIams.gif",
            "Product": "Chicken & Garden Pea Recipe",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Dry",
            "Ingredients": "[\"Chicken\", \"Peas\", \"Pea Starch\", \"Chicken Meal\", \"Menhaden Meal\", \"Beet Pulp\", \"Chicken Fat (Preserved with Mixed Tocopherols a Source of Vitamin E)\", \"Dried Egg Product\", \"Natural Flavors\", \"Flaxseed\", \"Potassium Chloride\", \"Salt\", \"Monosodium Phosphate\", \"Carrots\", \"Tomatoes\", \"Choline Chloride\", \"Spinach\", \"Blueberries\", \"Vitamins (Ascorbic Acid\", \"Vitamin A Acetate\", \"Calcium Pantothenate\", \"Biotin\", \"Thiamine Mononitrate (source of vitamin B1)\", \"Vitamin B12 Supplement\", \"Niacin\", \"Riboflavin Supplement (source of vitamin B2)\", \"Inositol\", \"Pyridoxine Hydrochloride (source of vitamin B6)\", \"Vitamin D3 Supplement\", \"Folic Acid)\", \"Minerals (Ferrous Sulfate\", \"Zinc Oxide\", \"Manganese Sulfate\", \"Copper Sulfate\", \"Manganous Oxide\", \"Potassium Iodide\", \"Cobalt Carbonate)\", \"DL-Methionine\", \"Apple Pomace\", \"Calcium Carbonate\", \"Rosemary Extract\"]",
            "Arginine(min.)": "[\"3 lbs.  1/4 - 3/8 cup\", \"10 lbs.  1/2 - 3/4 cup\", \"20 lbs.  1 - 1 1/4 cups\", \"30 lbs.  1 1/4 - 1 1/2 cups\", \"40 lbs.  1 1/2 - 1 3/4 cups\", \"60 lbs.  2 - 2 1/4 cups\", \"80 lbs.  2 1/4 - 2 3/4 cups\", \"100 lbs.  2 3/4 - 3 1/4 cups\"]\n",
            "Omega": "[\"Farm-raised chicken is the 1st ingredient\", \"high quality protein and farm-grown fruits and vegetables\", \"No artificial: preservatives\", \"colors\", \"or flavors\", \"Enhanced with a vitamin & antioxidant blend\"]",
            "Protease*(AspergillusOryzae) ": "[\"Healthy body\"]",
            "Amylase* (Aspergillus oryzae) ": "[\"Natural Flavor\", \"Chicken\"]",
            "Cellulase*(TrichodermaReesei)": "http://www.iams.com/dog-food/grain-free-naturals-chicken-and-garden-pea",
            "Hemicellulase*(TrichodermaReesei)": "http://media.iams.com/en_us/data_root/_images/dog/products/hn_d_chickengardenpea_lg_enus_1.jpg",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        },
        {
            "Brand": "Life Protection Formula®",
            "Manufacturer": "Blue Buffalo",
            "LogoLink": "http://www.avenuek9.com/wp-content/uploads/bluebuffalo.jpg",
            "Product": "Lamb & Brown Rice Recipe",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Dry",
            "Ingredients": "[\"Deboned Lamb\", \"Oatmeal\", \"Whole Ground Brown Rice\", \"Whole Ground Barley\", \"Chicken Meal\", \"Turkey Meal\", \"Rice Bran\", \"Tomato Pomace (source of Lycopene)\", \"Peas\", \"Chicken Fat (preserved with Mixed Tocopherols)\", \"Natural Chicken Flavor\", \"Sunflower Oil (source of Omega 6 Fatty Acids)\", \"Whole Potatoes\", \"Flaxseed (source of Omega 3 and 6 Fatty Acids)\", \"Alfalfa Meal\", \"Whole Carrots\", \"Whole Sweet Potatoes\", \"Blueberries\", \"Cranberries\", \"Apples\", \"Blackberries\", \"Pomegranate\", \"Spinach\", \"Pumpkin\", \"Barley Grass\", \"Dried Parsley\", \"Garlic\", \"Dried Kelp\", \"Yucca Schidigera Extract\", \"L-Carnitine\", \"L-Lysine\", \"Glucosamine Hydrochloride\", \"Turmeric\", \"Dried Chicory Root\", \"Oil of Rosemary\", \"Beta Carotene\", \"Vitamin A Supplement\", \"Thiamine Mononitrate (Vitamin B1)\", \"Riboflavin (Vitamin B2)\", \"Niacin (Vitamin B3)\", \"d-Calcium Pantothenate (Vitamin B5)\", \"Pyridoxine Hydrochloride (Vitamin B6)\", \"Biotin (Vitamin B7)\", \"Folic Acid (Vitamin B9)\", \"Vitamin B12 Supplement\", \"Calcium Ascorbate (source of Vitamin C)\", \"Vitamin D3 Supplement\", \"Vitamin E Supplement\", \"Iron Amino Acid Chelate\", \"Zinc Amino Acid Chelate\", \"Manganese Amino Acid Chelate\", \"Copper Amino Acid Chelate\", \"Choline Chloride\", \"Sodium Selenite\", \"Calcium Iodate\", \"Salt\", \"Caramel\", \"Calcium Carbonate\", \"Potassium Chloride\", \"Dried Yeast (source of Saccharomyces cerevisiae)\", \"Dried Lactobacillus acidophilus fermentation product\", \"Dried Bacillus subtilis fermentation product\", \"Dried Enterococcus faecium fermentation product\"]",
            "Arginine(min.)": "[\"Upto 5 lbs.  1/4 to 1/2 cup\", \"6 – 10 lbs. 1/2 to 1 cup\", \"11 – 15 lbs.  1 to 1 1/4 cup\", \"16 – 20 lbs.  1 1/4 to 1 1/2 cups\", \"21 – 25 lbs.  1 1/2 to 1 3/4 cups\", \"26 – 30 lbs.  1 3/4 to 2 cups\"]",
            "Omega": "[\"Always starts with Real Lamb\", \"A high-quality protein\", \"Increased levels of protein and carbohydrates\", \"Unique “small breed” kibble\", \"An optimal balance of Omega 3 & 6 Fatty Acids\", \"Essential vitamins & chelated minerals and important antioxidants\", \"No chicken (or poultry) by-product meals and No corn & wheat and soy free\", \"No Artificial Preservatives & Colours or Flavors\"]",
            "Protease*(AspergillusOryzae) ": "[\"Healthy Muscle Development\", \"Higher Energy Needs\", \"Dental Health\", \"Joint Health\", \"Healthy Skin & Coat\", \"Immune System Health\"]",
            "Amylase* (Aspergillus oryzae) ": "[\"Natural Chicken Flavor\"]",
            "Cellulase*(TrichodermaReesei)": "http://bluebuffalo.com/natural-dog-food/healthy-holistic-blue-life-protection-formula/lpf-small-breed-adult-lamb-and-brown-rice-recipe/",
            "Hemicellulase*(TrichodermaReesei)": "http://bluebuffalo.com/globalassets/1.-product-pages/1.-brand-images/1.3-lpf/2.-product-images/dog_lpf_sb_adult_lamb_dry_lg.png",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        },
        {
            "Brand": "Iams® Healthy Naturals™",
            "Manufacturer": "Iams",
            "LogoLink": "http://www.zeiglersdist.com/images/products/All-Logos/LogoIams.gif",
            "Product": "Adult Dog Food Chicken + Barley Recipe",
            "PetType": "Dog",
            "AgeCategory": "Adult",
            "Type": "Dry",
            "Ingredients": "[\"Chicken\", \"Ground Whole Grain Sorghum\", \"Ground Whole Grain Barley\", \"Chicken Meal\", \"Brewers Rice\", \"Fish Meal (source of fish oil)\", \"Dried Egg Product\", \"Dried Beet Pulp\", \"Chicken Flavor\", \"Chicken Fat (preserved with mixed Tocopherols\", \"a source of Vitamin E)\", \"Potassium Chloride\", \"Salt\", \"Carrots\", \"Tomatoes\", \"Monosodium Phosphate\", \"Choline Chloride\", \"Spinach\", \"Peas\", \"Minerals (Ferrous Sulfate\", \"Zinc Oxide\", \"Manganese Sulfate\", \"Copper Sulfate\", \"Manganous Oxide\", \"Potassium Iodide\", \"Cobalt Carbonate)\", \"Vitamins (Ascorbic Acid\", \"Vitamin A Acetate\", \"Calcium Pantothenate\", \"Biotin\", \"Thiamine Mononitrate (source of vitamin B1)\", \"Vitamin B12 Supplement\", \"Niacin\", \"Riboflavin Supplement (source of vitamin B2)\", \"Inositol\", \"Pyridoxine Hydrochloride (source of vitamin B6)\", \"Vitamin D3 Supplement\", \"Folic Acid)\", \"DL-Methionine\", \"Dried Apple Pomace\", \"Calcium Carbonate\", \"Vitamin E Supplement\", \"Rosemary Extract\"]",
            "Arginine(min.)": "[\"3 lbs.  3/8 - 1/2 cup\", \"10 lbs.  3/4 - 1 cup\", \"20 lbs.  1 1/4 - 1 1/2 cups\", \"30 lbs.  1 1/2 - 2 cups\", \"40 lbs.  2 - 2 1/4 cups\", \"60 lbs.  2 1/2 - 3 cups\", \"80 lbs.  3 - 3 1/2 cups\", \"100 lbs.  3 1/2 - 4 1/4 cups\"]",
            "Omega": "[\"Farm-raised chicken is the 1st ingredient\", \"high quality protein and farm-grown fruits and vegetables\", \"No artificial: preservatives\", \"colors\", \"or flavors\", \"Enhanced with a vitamin & antioxidant blend\"]",
            "Protease*(AspergillusOryzae) ": "[\"Healthy body\"]",
            "Amylase* (Aspergillus oryzae) ": "[\"Chicken\"]",
            "Cellulase*(TrichodermaReesei)": "http://www.iams.com/dog-food/iams-healthy-naturals-adult-with-wholesome-chicken",
            "Hemicellulase*(TrichodermaReesei)": "http://media.iams.com/en_us/data_root/_images/dog/products/hn_d_chickenbarley_lg_enus_1.jpg",
            "Lipase*(AspergillusNiger)": "",
            "": "",
            "FeedingGuidelines": " ",
            "ProductClaims": "",
            "HealthRelated": "",
            "Flavor": "",
            "WebURL": "",
            "ProductImage": ""
        }]