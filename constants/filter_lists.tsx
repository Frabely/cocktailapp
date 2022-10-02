import {ALL_LABEL} from "./labels";
import {IconTitleObject, LabelListType} from "./types";
import {faSortAlphaUp, faSortAlphaDown, faHeart} from "@fortawesome/free-solid-svg-icons";

export const CATEGORY_LIST: LabelListType = {
    ENG: [ALL_LABEL.ENG, 'Shot', 'Beer', 'Shake', 'Cocktail', 'Ordinary Drink', 'Homemade Liqueur',
        'Punch / Party Drink', 'Coffee / Tea', 'Cocoa', 'Soft Drink', 'Other / Unknown'],
    GER: [ALL_LABEL.GER, 'Shot', 'Bier', 'Shake', 'Cocktail', 'Gewöhnliches Getränk', 'Hausgemachter Likör',
        'Punsch / Partygetränk', 'Kaffee / Tee', 'Kakao', 'Erfrischungs-Getränk', 'Andere / Unbekannt']
}

export const SORT_LIST: LabelListType = {
    ENG: ['AlphabeticalAZ', 'AlphabeticalZA', 'Favorites'],
    GER: ['AlphabetischAZ', 'AlphabetischZA', 'Favoriten']
}

export const ICON_NAME_LIST: IconTitleObject[] = [
    {icon: faSortAlphaDown, titleENG: 'AlphabeticalAZ'},
    {icon: faSortAlphaUp, titleENG: 'AlphabeticalZA'},
    {icon: faHeart, titleENG: 'Favorites'}
]

export const ALCOHOLIC_LIST: LabelListType = {
    ENG: [ALL_LABEL.ENG, 'Alcoholic', 'Non alcoholic'],
    GER: [ALL_LABEL.GER, 'Alkoholisch', 'Nicht Alkoholisch']
}

export const GLASS_TYPE_LIST: string[] = [ALL_LABEL.ENG, 'Old-fashioned glass', 'Beer Glass', 'Beer mug', 'White wine glass',
    'Shot glass', 'Collins glass', 'Collins Glass', 'Highball glass', 'Cocktail glass', 'Irish coffee cup', 'Jar',
    'Champagne flute', 'Martini Glass', 'Margarita/Coupette glass', 'Coffee mug', 'Pousse cafe glass', 'Wine Glass',
    'Punch Bowl', 'Punch bowl', 'Beer pilsner', 'Highball Glass', 'Cocktail Glass', 'Coffee Mug']

export const INGREDIENT_LIST: object[] = [
    {
        'label': 'Absolut Kurant',
        'value': 'Absolut Kurant',
    }, {'label': 'Grand Marnier', 'value': 'Grand Marnier'}, {
        'label': 'Chambord Raspberry Liqueur',
        'value': 'Chambord Raspberry Liqueur'
    }, {'label': 'Midori Melon Liqueur', 'value': 'Midori Melon Liqueur'}, {
        'label': 'Malibu Rum',
        'value': 'Malibu Rum'
    }, {'label': 'Amaretto', 'value': 'Amaretto'}, {
        'label': 'Cranberry Juice',
        'value': 'Cranberry Juice'
    }, {'label': 'Pineapple Juice', 'value': 'Pineapple Juice'}, {'label': 'Lager', 'value': 'Lager'}, {
        'label': 'Tequila',
        'value': 'Tequila'
    }, {'label': 'Light Rum', 'value': 'Light Rum'}, {
        'label': '151 Proof Rum',
        'value': '151 Proof Rum'
    }, {'label': 'Dark Creme De Cacao', 'value': 'Dark Creme De Cacao'}, {
        'label': 'Cointreau',
        'value': 'Cointreau'
    }, {'label': 'Milk', 'value': 'Milk'}, {
        'label': 'Coconut Liqueur',
        'value': 'Coconut Liqueur'
    }, {'label': 'Vanilla Ice Cream', 'value': 'Vanilla Ice Cream'}, {
        'label': 'Dark Rum',
        'value': 'Dark Rum'
    }, {'label': 'Vodka', 'value': 'Vodka'}, {'label': 'Orange Juice', 'value': 'Orange Juice'}, {
        'label': 'Goldschlager',
        'value': 'Goldschlager'
    }, {'label': 'Jägermeister', 'value': 'Jägermeister'}, {
        'label': 'Rumple Minze',
        'value': 'Rumple Minze'
    }, {'label': 'Wild Turkey', 'value': 'Wild Turkey'}, {
        'label': 'Jack Daniels',
        'value': 'Jack Daniels'
    }, {'label': 'Johnnie Walker', 'value': 'Johnnie Walker'}, {'label': 'Jim Beam', 'value': 'Jim Beam'}, {
        'label': 'Gin',
        'value': 'Gin'
    }, {'label': 'Triple Sec', 'value': 'Triple Sec'}, {
        'label': 'Coca Cola',
        'value': 'Coca Cola'
    }, {'label': 'Sweet And Sour', 'value': 'Sweet And Sour'}, {'label': 'Bitters', 'value': 'Bitters'}, {
        'label': 'Lemon',
        'value': 'Lemon'
    }, {'label': 'Peach Vodka', 'value': 'Peach Vodka'}, {
        'label': 'Vanilla Vodka',
        'value': 'Vanilla Vodka'
    }, {'label': 'Blue Curacao', 'value': 'Blue Curacao'}, {
        'label': 'Blueberry Schnapps',
        'value': 'Blueberry Schnapps'
    }, {'label': 'Sour Mix', 'value': 'Sour Mix'}, {'label': '7 Up', 'value': '7 Up'}, {
        'label': 'Creme De Cacao',
        'value': 'Creme De Cacao'
    }, {'label': 'Lemon Juice', 'value': 'Lemon Juice'}, {
        'label': 'Kahlua',
        'value': 'Kahlua'
    }, {'label': 'Baileys Irish Cream', 'value': 'Baileys Irish Cream'}, {
        'label': 'Frangelico',
        'value': 'Frangelico'
    }, {'label': 'Roses Sweetened Lime Juice', 'value': 'Roses Sweetened Lime Juice'}, {
        'label': 'Sprite',
        'value': 'Sprite'
    }, {'label': 'Absolut Citron', 'value': 'Absolut Citron'}, {
        'label': 'Orange Curacao',
        'value': 'Orange Curacao'
    }, {'label': 'Strawberry Liqueur', 'value': 'Strawberry Liqueur'}, {
        'label': 'Coconut Rum',
        'value': 'Coconut Rum'
    }, {'label': 'Grenadine', 'value': 'Grenadine'}, {
        'label': 'Ginger Beer',
        'value': 'Ginger Beer'
    }, {'label': 'Lemon Peel', 'value': 'Lemon Peel'}, {
        'label': 'Peach Schnapps',
        'value': 'Peach Schnapps'
    }, {'label': 'Kirschwasser', 'value': 'Kirschwasser'}, {
        'label': 'Strawberries',
        'value': 'Strawberries'
    }, {'label': 'Schweppes Russchian', 'value': 'Schweppes Russchian'}, {
        'label': 'Añejo Rum',
        'value': 'Añejo Rum'
    }, {'label': 'Ginger Ale', 'value': 'Ginger Ale'}, {
        'label': 'Southern Comfort',
        'value': 'Southern Comfort'
    }, {'label': 'Ice', 'value': 'Ice'}, {'label': 'Soda Water', 'value': 'Soda Water'}, {
        'label': 'Creme De Banane',
        'value': 'Creme De Banane'
    }, {'label': 'Maraschino Cherry', 'value': 'Maraschino Cherry'}, {
        'label': 'Applejack',
        'value': 'Applejack'
    }, {'label': 'Grapefruit Juice', 'value': 'Grapefruit Juice'}, {
        'label': 'White Creme De Menthe',
        'value': 'White Creme De Menthe'
    }, {'label': 'Hot Chocolate', 'value': 'Hot Chocolate'}, {
        'label': 'Orange Bitters',
        'value': 'Orange Bitters'
    }, {'label': 'Orange', 'value': 'Orange'}, {'label': 'Cherry', 'value': 'Cherry'}, {
        'label': 'Sweet Vermouth',
        'value': 'Sweet Vermouth'
    }, {'label': 'Angostura Bitters', 'value': 'Angostura Bitters'}, {
        'label': 'Cognac',
        'value': 'Cognac'
    }, {'label': 'Peach Nectar', 'value': 'Peach Nectar'}, {'label': 'Sugar', 'value': 'Sugar'}, {
        'label': 'Anise',
        'value': 'Anise'
    }, {'label': 'Licorice Root', 'value': 'Licorice Root'}, {
        'label': 'Wormwood',
        'value': 'Wormwood'
    }, {'label': 'Pisang Ambon', 'value': 'Pisang Ambon'}, {
        'label': 'Bitter Lemon',
        'value': 'Bitter Lemon'
    }, {'label': 'Lime Juice', 'value': 'Lime Juice'}, {
        'label': 'Tonic Water',
        'value': 'Tonic Water'
    }, {'label': 'Absolut Vodka', 'value': 'Absolut Vodka'}, {
        'label': 'Champagne',
        'value': 'Champagne'
    }, {'label': 'Egg White', 'value': 'Egg White'}, {'label': 'Mint', 'value': 'Mint'}, {
        'label': 'Heavy Cream',
        'value': 'Heavy Cream'
    }, {'label': 'Creme De Cassis', 'value': 'Creme De Cassis'}, {
        'label': 'Fresh Lemon Juice',
        'value': 'Fresh Lemon Juice'
    }, {'label': 'Rum', 'value': 'Rum'}, {'label': 'Fruit', 'value': 'Fruit'}, {
        'label': 'Salt',
        'value': 'Salt'
    }, {'label': 'Fruit Juice', 'value': 'Fruit Juice'}, {'label': 'Lemonade', 'value': 'Lemonade'}, {
        'label': 'Water',
        'value': 'Water'
    }, {'label': 'Dry Vermouth', 'value': 'Dry Vermouth'}, {
        'label': 'Vermouth',
        'value': 'Vermouth'
    }, {'label': 'Fresh Lime Juice', 'value': 'Fresh Lime Juice'}, {
        'label': 'Sugar Syrup',
        'value': 'Sugar Syrup'
    }, {'label': 'Sherry', 'value': 'Sherry'}, {
        'label': 'Strawberry Schnapps',
        'value': 'Strawberry Schnapps'
    }, {'label': 'Club Soda', 'value': 'Club Soda'}, {'label': 'Scotch', 'value': 'Scotch'}, {
        'label': 'Apricot Brandy',
        'value': 'Apricot Brandy'
    }, {'label': 'Lime', 'value': 'Lime'}, {
        'label': 'Peppermint Schnapps',
        'value': 'Peppermint Schnapps'
    }, {'label': 'Coffee', 'value': 'Coffee'}, {'label': 'Cream', 'value': 'Cream'}, {
        'label': 'Sloe Gin',
        'value': 'Sloe Gin'
    }, {'label': 'Yellow Chartreuse', 'value': 'Yellow Chartreuse'}, {
        'label': 'Light Cream',
        'value': 'Light Cream'
    }, {'label': 'Nutmeg', 'value': 'Nutmeg'}, {
        'label': 'Lemon Vodka',
        'value': 'Lemon Vodka'
    }, {'label': 'Blended Whiskey', 'value': 'Blended Whiskey'}, {
        'label': 'Bourbon',
        'value': 'Bourbon'
    }, {'label': 'Blackberry Brandy', 'value': 'Blackberry Brandy'}, {
        'label': 'Kummel',
        'value': 'Kummel'
    }, {'label': 'White Wine', 'value': 'White Wine'}, {
        'label': 'Orange Peel',
        'value': 'Orange Peel'
    }, {'label': 'Apricot', 'value': 'Apricot'}, {
        'label': 'Almond Flavoring',
        'value': 'Almond Flavoring'
    }, {'label': 'Grain Alcohol', 'value': 'Grain Alcohol'}, {
        'label': 'Brandy',
        'value': 'Brandy'
    }, {'label': 'Food Coloring', 'value': 'Food Coloring'}, {
        'label': 'Glycerine',
        'value': 'Glycerine'
    }, {'label': 'Chocolate Ice Cream', 'value': 'Chocolate Ice Cream'}, {
        'label': 'Cider',
        'value': 'Cider'
    }, {'label': 'Tea', 'value': 'Tea'}, {'label': 'Whipped Cream', 'value': 'Whipped Cream'}, {
        'label': 'Campari',
        'value': 'Campari'
    }, {'label': 'Apple Brandy', 'value': 'Apple Brandy'}, {
        'label': 'Angelica Root',
        'value': 'Angelica Root'
    }, {'label': 'Almond', 'value': 'Almond'}, {'label': 'Allspice', 'value': 'Allspice'}, {
        'label': 'Cinnamon',
        'value': 'Cinnamon'
    }, {'label': 'Coriander', 'value': 'Coriander'}, {
        'label': 'Marjoram Leaves',
        'value': 'Marjoram Leaves'
    }, {'label': 'Aperol', 'value': 'Aperol'}, {'label': 'Prosecco', 'value': 'Prosecco'}, {
        'label': 'Apple Cider',
        'value': 'Apple Cider'
    }, {'label': 'Apple Schnapps', 'value': 'Apple Schnapps'}, {
        'label': 'Ginger',
        'value': 'Ginger'
    }, {'label': 'Apple Juice', 'value': 'Apple Juice'}, {
        'label': 'Hpnotiq',
        'value': 'Hpnotiq'
    }, {'label': 'Banana Liqueur', 'value': 'Banana Liqueur'}, {'label': 'Wine', 'value': 'Wine'}, {
        'label': 'Benedictine',
        'value': 'Benedictine'
    }, {'label': 'Grape Soda', 'value': 'Grape Soda'}, {'label': 'Candy', 'value': 'Candy'}, {
        'label': 'Maui',
        'value': 'Maui'
    }, {'label': 'Mountain Dew', 'value': 'Mountain Dew'}, {
        'label': 'Guava Juice',
        'value': 'Guava Juice'
    }, {'label': 'Pineapple', 'value': 'Pineapple'}, {'label': 'Berries', 'value': 'Berries'}, {
        'label': 'Apple',
        'value': 'Apple'
    }, {'label': 'Carrot', 'value': 'Carrot'}, {'label': 'Cantaloupe', 'value': 'Cantaloupe'}, {
        'label': 'Banana',
        'value': 'Banana'
    }, {'label': 'Yoghurt', 'value': 'Yoghurt'}, {'label': 'Honey', 'value': 'Honey'}, {
        'label': 'Passion Fruit Juice',
        'value': 'Passion Fruit Juice'
    }, {'label': 'Cocoa Powder', 'value': 'Cocoa Powder'}, {
        'label': 'Cornstarch',
        'value': 'Cornstarch'
    }, {'label': 'Chocolate', 'value': 'Chocolate'}, {'label': 'Egg', 'value': 'Egg'}, {
        'label': 'Vanilla',
        'value': 'Vanilla'
    }, {'label': 'Chocolate Syrup', 'value': 'Chocolate Syrup'}, {
        'label': 'Grapes',
        'value': 'Grapes'
    }, {'label': 'Grape Juice', 'value': 'Grape Juice'}, {
        'label': 'Carbonated Soft Drink',
        'value': 'Carbonated Soft Drink'
    }, {'label': 'Sherbet', 'value': 'Sherbet'}, {'label': 'Butter', 'value': 'Butter'}, {
        'label': 'Vanilla Extract',
        'value': 'Vanilla Extract'
    }, {'label': 'Half And Half', 'value': 'Half And Half'}, {
        'label': 'Marshmallows',
        'value': 'Marshmallows'
    }, {'label': 'Brown Sugar', 'value': 'Brown Sugar'}, {'label': 'Mint Syrup', 'value': 'Mint Syrup'}, {
        'label': 'Kiwi',
        'value': 'Kiwi'
    }, {'label': 'Papaya', 'value': 'Papaya'}, {'label': 'Cumin Seed', 'value': 'Cumin Seed'}, {
        'label': 'Mango',
        'value': 'Mango'
    }, {'label': 'Asafoetida', 'value': 'Asafoetida'}, {
        'label': 'Cayenne Pepper',
        'value': 'Cayenne Pepper'
    }, {'label': 'Lime Peel', 'value': 'Lime Peel'}, {'label': 'Cardamom', 'value': 'Cardamom'}, {
        'label': 'Cloves',
        'value': 'Cloves'
    }, {'label': 'Black Pepper', 'value': 'Black Pepper'}, {'label': 'Espresso', 'value': 'Espresso'}, {
        'label': 'Egg Yolk',
        'value': 'Egg Yolk'
    }, {'label': 'Whipping Cream', 'value': 'Whipping Cream'}, {
        'label': 'Condensed Milk',
        'value': 'Condensed Milk'
    }, {'label': 'Tomato Juice', 'value': 'Tomato Juice'}, {'label': 'Celery Salt', 'value': 'Celery Salt'}
]
