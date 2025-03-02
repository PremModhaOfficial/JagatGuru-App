import { router } from 'expo-router';
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import api from '~/api';

export default function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () => {
        console.log('Login button pressed');
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const resp = api.post('/auth/login/', {
                email,
                password,
            });

            resp.then((data) =>
                data.status === 200 || data.status === 201
                    ? router.replace('/main')
                    : router.replace('/login')
            );
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/c227dc24-49a9-562d-a1ae-6b5e5545d008/cd4a52a4-7503-5f13-92e8-9c3538c917a8.jpg',
                    }} // Replace with your logo
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Log In to Your Account</Text>
                <Text style={styles.subTitle}>Enter your credentials to continue</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                    Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
                </Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.copyrightText}>Copyright 2023 Your App Name</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7', // Light gray background
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderColor: '#ffa07a', // Orange border
        borderWidth: 2,
    },
    formContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff', // White background
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffa07a', // Orange title
        textAlign: 'center',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ffa07a', // Orange border
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f2f2f2', // Light gray background
    },
    button: {
        backgroundColor: '#ffa07a', // Orange button
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomText: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
    },
    linkText: {
        color: '#ffa07a',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    copyrightText: {
        color: '#666',
        fontSize: 12,
    },
});
