import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";

import { Feather, Ionicons } from '@expo/vector-icons'
import { Pressable } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Category, Item, Product } from "../../../types";
import { api } from "../../services/api";
import { colors, fontSize, spacing } from "../../constants/theme";
import { Select } from "../../components/Select";
import { ActivityIndicator } from "react-native";
import { QuantityControl } from "../../components/QuantityControl";
import { Button } from "../../components/Button";

type RouteDatailParams = {
    Order:{
        table: number | string;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDatailParams, 'Order'>;

export default function Order(){

    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();


    const { order_id, table } = route.params;


    const [categorias, setCategorias] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState("");

    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingAddItem, setLoadingAddItem] = useState(false);

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function loadDataCategories(){
            await loadCategories() 
        }
        loadDataCategories()
    }, [])

    useEffect(() => {
        if (selectedCategory){
            loadProducts(selectedCategory);
        }else{
            setProducts([])
            setSelectedCategory("")
        }
    }, [selectedCategory])

    async function loadCategories(){
        try{
            const response = await api.get<Category[]>("/categorylist")
            setCategorias(response.data)

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    async function loadProducts(categoryId: string){
        try{
            setLoadingProducts(true);

            const response = await api.get<Product[]>("/category/product", {
                params: {category_id: categoryId}
            });

            setProducts(response.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoadingProducts(false);
        }
    }

    async function handleAddItem(){
        try{
            setLoadingAddItem(true);

            const response = await api.post<Item>("/order/add", {
                order_id,
                product_id: selectedProduct,
                amount: quantity
            });

            setItems([...items, response.data]); //Itens anteriores e adicionando os novos na lista

            setSelectedCategory("");
            setSelectedProduct("");
            setQuantity(1);
        }catch(err){
            console.log(err);
            console.log({ order_id, selectedProduct, quantity });
        }finally{
            setLoadingAddItem(false);
        }
    }


    return(
        <View style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.table}</Text>

                <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="trash" size={22} color={colors.primary}/>
                </Pressable>
            </View>

            <ScrollView >
                <Select
                label="Categorias"
                placeholder="Selecione a categoria: "
                options={categorias.map(category => ({
                    label: category.name,
                    value: category.id
                }))}
                selectedValue={selectedCategory}
                onValueChange={setSelectedCategory}
                />

                {loadingProducts ? (
                    <ActivityIndicator
                    size="small" color={colors.brand}
                    />
                ) : (
                  selectedCategory && <Select
                  placeholder="Selecione um produto..."
                  options={products.map( product => ({
                    label: product.name,
                    value: product.id,
                  }))}
                  selectedValue={selectedProduct}
                  onValueChange={setSelectedProduct}
                  /> 
                )}
                
                {selectedProduct && (
                    <View style={styles.quantitySection}>
                        <Text style={styles.quantityLabel}> Quantidade: </Text>
                        <QuantityControl 
                        quantity={quantity}
                        onIncrement={() => setQuantity( quantity => quantity + 1)}
                        onDecrement={() => {
                            if(quantity <= 1){
                                setQuantity(1)
                                return;
                            }
                            setQuantity( quantity => quantity - 1)
                        }}
                        />
                    </View>
                )}

                {selectedProduct &&(
                    <Button
                    title="Adicionar"
                    variant="secondary"
                    onPress={handleAddItem}
                    />
                )}

                {items.length > 0 && (
                    <View style={styles.itemsSection}>
                        <Text style={styles.itemsText}>Itens Adicionados:</Text>
                        {items.map((item) => (
                            <Text key={item.id}>{item.product?.name}</Text>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: '5%',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
        backgroundColor: '#1d1d2e'
    },
    header:{
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
        borderBottomWidth:1,
        borderBottomColor: colors.borderColor,
        paddingBottom: spacing.md
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14
    },
    quantitySection:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
    },
    quantityLabel:{
        color: colors.gray,
        fontSize: fontSize.lg,
        fontWeight: "bold"
    },
    actions:{
        flexDirection:'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttonAdd:{
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button:{
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%', 
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    label:{
        fontSize: 15,
        marginTop:10,
        marginBottom: 14,
        fontWeight: 'bold',
        color: 'gray'
    },
    closeButton:{
        backgroundColor: colors.red,
        padding: spacing.sm,
        borderRadius: 8,
    },
    itemsSection:{
        marginTop: spacing.xl,
        gap: spacing.md,
    },
    itemsText:{
        color: colors.primary,
        fontWeight: "bold",
        fontSize: fontSize.lg,
    }
})