import ItemService from '../services/ItemService.js';

export const createItem = async (req, res) => {
    try {
        const newData = {
            ...req.body,
            url: req.file ? `/uploads/${req.file.filename}` : req.body.url,
        };
        const item = await ItemService.createItem(newData);
        return res.status(201).json(item);

    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const getAllItens = async (req, res) => {
    try {
        const uid = req.user.uid;
        const itens = await ItemService.getAllItens(uid);
        return res.status(200).json(itens);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const getItemById = async (req, res) => {
    try {
        const {id} = req.params;
        const item = await ItemService.getItemById(id);
        return res.status(200).json(item);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const uid = req.user.uid;
        const data = {...req.body};
        if (req.file) {
            data.url = `/uploads/${req.file.filename}`;
        }
        const updatedItem = await ItemService.updateItem(id, data, req.file, uid);
        return res.status(200).json(updatedItem);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await ItemService.deleteItem(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};