import Item from "./Item.js";
import Colecao from "./Colecao.js";
import Comentario from "./Comentario.js";

Colecao.hasMany(Item, { foreignKey: "idColecao" });
Item.belongsTo(Colecao, { foreignKey: "idColecao" });

Colecao.hasMany(Comentario, { foreignKey: "idColecao" });
Comentario.belongsTo(Colecao, { foreignKey: "idColecao" });

export { Item, Colecao, Comentario };