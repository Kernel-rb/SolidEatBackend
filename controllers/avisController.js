const Avis = require('../models/Avis');

const creerAvis = async (req, res, next) => {
    try {
        const { restaurantId, contenu, notation } = req.body;
        const userId = req.user.id;
        const avis = await Avis.create({ restaurantId, userId, contenu, notation });
        res.status(201).json({ message: 'Avis créé avec succès', avis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Échec de la création de l\'avis' });
    }
};

const obtenirAvisRestaurant = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId;
        const avis = await Avis.find({ restaurantId }).populate('userId', 'name');
        res.status(200).json(avis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Échec de la récupération des avis' });
    }
};


module.exports = { creerAvis, obtenirAvisRestaurant };