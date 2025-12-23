import {Text, TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator} from "react-native";
import { borderRadius, colors, fontSize, spacing } from "../constants/theme";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: "primary" | "secondary";
    loading?: boolean;
}

export function Button({
    title,
    variant = "primary",
    loading = false,
    disabled,
    style,
    ...rest
}: ButtonProps){

    const backgroundColor = variant === "primary" ? colors.green : colors.brand;

    return (
        <TouchableOpacity 
        style={[
            { backgroundColor: backgroundColor} ,
            styles.button,
            (disabled || loading) && styles.buttonDisabled,
            style,
        ]}
        {...rest}
        >
            {loading ? ( //interface visual do loading
                <ActivityIndicator color={colors.background}/>
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        width: '95%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.lg,
    },
    buttonText:{
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.background,
    },
    buttonDisabled:{
        opacity: 0.6,
    }
})