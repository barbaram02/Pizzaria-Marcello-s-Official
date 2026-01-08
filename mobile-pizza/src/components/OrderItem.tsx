import { View, Text, StyleSheet, Pressable } from "react-native";
import { Item } from "../../types";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/theme";

interface OrderItemProps{
    item: Item;
    onRemove: () => Promise<void>
}

export function OrderItem({item}: OrderItemProps){
    return(
        <View style={styles.container}>
            <View style={styles.context}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.productDetail}>{item.amount}X - {item.product.price}</Text>
            </View>

            <Pressable style={styles.deleteButton}>
                <Feather name="trash" size={16} color={colors.red} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.backgroundInput
    },
    context:{

    },
    productName:{

    },
    productDetail:{

    },
    deleteButton:{

    },
})