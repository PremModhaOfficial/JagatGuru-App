import { Link, Stack } from 'expo-router';
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export default function SignUpPage() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://your-django-backend-url.com/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password: password1,
                    password2,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
            } else {
                console.error('Registration failed:', response.status);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/admin/api/auth/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password: password1,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
            } else {
                console.error('Login failed:', response.status);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
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
                    <Text style={styles.title}>Create Your Account</Text>
                    <Text style={styles.subTitle}>Enter your details to get started</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={setUsername}
                    />
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
                        value={password1}
                        onChangeText={setPassword1}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={password2}
                        onChangeText={setPassword2}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <Text style={styles.bottomText}>
                        Already have an account?{' '}
                        <Link href="/login">
                            {' '}
                            <Text style={styles.linkText}>Log In</Text>
                        </Link>
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.copyrightText}>Copyright 2023 Your App Name</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // White background
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
