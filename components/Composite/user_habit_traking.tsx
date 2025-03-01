// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
// // // import { Calendar } from 'react-native-calendars';
// // // import { TextInput } from 'react-native-paper';

// // // const HabitTracker = () => {
// // //     const [habits, setHabits] = useState([]);
// // //     const [newHabit, setNewHabit] = useState('');
// // //     const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
// // //     const [habitLog, setHabitLog] = useState({});

// // //     useEffect(() => {
// // //         const storedHabits = localStorage.getItem('habits');
// // //         if (storedHabits) {
// // //             setHabits(JSON.parse(storedHabits));
// // //         }
// // //     }, []);

// // //     useEffect(() => {
// // //         localStorage.setItem('habits', JSON.stringify(habits));
// // //     }, [habits]);

// // //     const addHabit = () => {
// // //         if (newHabit) {
// // //             setHabits([...habits, newHabit]);
// // //             setNewHabit('');
// // //         }
// // //     };

// // //     const logHabit = (habit) => {
// // //         const logEntry = habitLog[selectedDate] || {};
// // //         logEntry[habit] = !logEntry[habit];
// // //         setHabitLog({ ...habitLog, [selectedDate]: logEntry });
// // //     };

// // //     const renderHabit = ({ item }) => (
// // //         <TouchableOpacity onPress={() => logHabit(item)} style={styles.habitItem}>
// // //             <Text style={styles.habitText}>{item}</Text>
// // //             {habitLog[selectedDate] && habitLog[selectedDate][item] && (
// // //                 <Text style={styles.checked}>✓</Text>
// // //             )}
// // //         </TouchableOpacity>
// // //     );

// // //     return (
// // //         <View style={styles.container}>
// // //             <Calendar
// // //                 onDayPress={(day) => setSelectedDate(day.dateString)}
// // //                 markedDates={{
// // //                     [selectedDate]: { selected: true },
// // //                 }}
// // //             />
// // //             <View style={styles.habitList}>
// // //                 <FlatList
// // //                     data={habits}
// // //                     renderItem={renderHabit}
// // //                     keyExtractor={(item) => item}
// // //                 />
// // //             </View>
// // //             <View style={styles.addHabitContainer}>
// // //                 <TextInput
// // //                     style={styles.input}
// // //                     placeholder="New Habit"
// // //                     value={newHabit}
// // //                     onChangeText={setNewHabit}
// // //                 />
// // //                 <TouchableOpacity onPress={addHabit} style={styles.addButton}>
// // //                     <Text style={styles.addButtonText}>Add Habit</Text>
// // //                 </TouchableOpacity>
// // //             </View>
// // //         </View>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         justifyContent: 'center',
// // //         alignItems: 'center',
// // //         backgroundColor: '#f7f7f7',
// // //     },
// // //     habitList: {
// // //         width: '90%',
// // //         padding: 10,
// // //     },
// // //     habitItem: {
// // //         paddingVertical: 10,
// // //         paddingHorizontal: 15,
// // //         borderBottomWidth: 1,
// // //         borderColor: '#ccc',
// // //     },
// // //     habitText: {
// // //         fontSize: 16,
// // //         color: '#333',
// // //     },
// // //     checked: {
// // //         fontSize: 18,
// // //         color: '#34C759',
// // //         marginLeft: 10,
// // //     },
// // //     addHabitContainer: {
// // //         width: '90%',
// // //         padding: 10,
// // //         flexDirection: 'row',
// // //         justifyContent: 'space-between',
// // //         alignItems: 'center',
// // //     },
// // //     input: {
// // //         width: '70%',
// // //         height: 40,
// // //         borderColor: '#ccc',
// // //         borderWidth: 1,
// // //         padding: 10,
// // //     },
// // //     addButton: {
// // //         backgroundColor: '#34C759',
// // //         paddingVertical: 10,
// // //         paddingHorizontal: 15,
// // //         borderRadius: 8,
// // //     },
// // //     addButtonText: {
// // //         color: '#fff',
// // //         fontSize: 16,
// // //         fontWeight: 'bold',
// // //     },
// // // });

// // // export default HabitTracker;
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
// // import { Calendar } from 'react-native-calendars';
// // import { TextInput } from 'react-native-paper';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const HabitTracker = () => {
// //     const [habits, setHabits] = useState([]);
// //     const [newHabit, setNewHabit] = useState('');
// //     const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
// //     const [habitLog, setHabitLog] = useState({});

// //     useEffect(() => {
// //         const loadHabits = async () => {
// //             try {
// //                 const storedHabits = await AsyncStorage.getItem('habits');
// //                 if (storedHabits) {
// //                     setHabits(JSON.parse(storedHabits));
// //                 }
// //             } catch (error) {
// //                 console.error('Error loading habits:', error);
// //             }
// //         };
// //         loadHabits();
// //     }, []);

// //     useEffect(() => {
// //         const saveHabits = async () => {
// //             try {
// //                 await AsyncStorage.setItem('habits', JSON.stringify(habits));
// //             } catch (error) {
// //                 console.error('Error saving habits:', error);
// //             }
// //         };
// //         saveHabits();
// //     }, [habits]);

// //     const addHabit = () => {
// //         if (newHabit) {
// //             setHabits([...habits, newHabit]);
// //             setNewHabit('');
// //         }
// //     };

// //     const logHabit = (habit) => {
// //         const logEntry = habitLog[selectedDate] || {};
// //         logEntry[habit] = !logEntry[habit];
// //         setHabitLog({ ...habitLog, [selectedDate]: logEntry });
// //     };

// //     const renderHabit = ({ item }) => (
// //         <TouchableOpacity onPress={() => logHabit(item)} style={styles.habitItem}>
// //             <Text style={styles.habitText}>{item}</Text>
// //             {habitLog[selectedDate] && habitLog[selectedDate][item] && (
// //                 <Text style={styles.checked}>✓</Text>
// //             )}
// //         </TouchableOpacity>
// //     );

// //     return (
// //         <View style={styles.container}>
// //             <Calendar
// //                 onDayPress={(day) => setSelectedDate(day.dateString)}
// //                 markedDates={{
// //                     [selectedDate]: { selected: true },
// //                 }}
// //             />
// //             <View style={styles.habitList}>
// //                 <FlatList
// //                     data={habits}
// //                     renderItem={renderHabit}
// //                     keyExtractor={(item) => item}
// //                 />
// //             </View>
// //             <View style={styles.addHabitContainer}>
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="New Habit"
// //                     value={newHabit}
// //                     onChangeText={setNewHabit}
// //                 />
// //                 <TouchableOpacity onPress={addHabit} style={styles.addButton}>
// //                     <Text style={styles.addButtonText}>Add Habit</Text>
// //                 </TouchableOpacity>
// //             </View>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         backgroundColor: '#f7f7f7',
// //     },
// //     habitList: {
// //         width: '90%',
// //         padding: 10,
// //     },
// //     habitItem: {
// //         paddingVertical: 10,
// //         paddingHorizontal: 15,
// //         borderBottomWidth: 1,
// //         borderColor: '#ccc',
// //     },
// //     habitText: {
// //         fontSize: 16,
// //         color: '#333',
// //     },
// //     checked: {
// //         fontSize: 18,
// //         color: '#34C759',
// //         marginLeft: 10,
// //     },
// //     addHabitContainer: {
// //         width: '90%',
// //         padding: 10,
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //     },
// //     input: {
// //         width: '70%',
// //         height: 40,
// //         borderColor: '#ccc',
// //         borderWidth: 1,
// //         padding: 10,
// //     },
// //     addButton: {
// //         backgroundColor: '#34C759',
// //         paddingVertical: 10,
// //         paddingHorizontal: 15,
// //         borderRadius: 8,
// //     },
// //     addButtonText: {
// //         color: '#fff',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //     },
// // });

// // export default HabitTracker;
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {TextInput} from '@react-native-async-storage/async-storage'
// const HabitTracker = () => {
//     const [habits, setHabits] = useState([]);
//     const [newHabit, setNewHabit] = useState('');
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [habitLog, setHabitLog] = useState({});

//     useEffect(() => {
//         const loadHabits = async () => {
//             try {
//                 const storedHabits = await AsyncStorage.getItem('habits');
//                 if (storedHabits) {
//                     setHabits(JSON.parse(storedHabits));
//                 }
//             } catch (error) {
//                 console.error('Error loading habits:', error);
//             }
//         };
//         loadHabits();
//     }, []);

//     useEffect(() => {
//         const saveHabits = async () => {
//             try {
//                 await AsyncStorage.setItem('habits', JSON.stringify(habits));
//             } catch (error) {
//                 console.error('Error saving habits:', error);
//             }
//         };
//         saveHabits();
//     }, [habits]);

//     const addHabit = () => {
//         if (newHabit) {
//             setHabits([...habits, newHabit]);
//             setNewHabit('');
//         }
//     };

//     const logHabit = (habit) => {
//         const logEntry = habitLog[selectedDate] || {};
//         logEntry[habit] = !logEntry[habit];
//         setHabitLog({ ...habitLog, [selectedDate]: logEntry });
//     };

//     const renderHabit = ({ item }) => (
//         <TouchableOpacity onPress={() => logHabit(item)} style={styles.habitItem}>
//             <Text style={styles.habitText}>{item}</Text>
//             {habitLog[selectedDate] && habitLog[selectedDate][item] && (
//                 <Text style={styles.checked}>✓</Text>
//             )}
//         </TouchableOpacity>
//     );

//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const dates = Array.from({ length: 30 }, (_, i) => i + 1);

//     const handleDateSelect = (date) => {
//         setSelectedDate(date.toString());
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.calendarContainer}>
//                 <FlatList
//                     data={daysOfWeek}
//                     renderItem={({ item }) => (
//                         <Text style={{ fontSize: 16, margin: 5 }}>{item}</Text>
//                     )}
//                     horizontal
//                 />
//                 <FlatList
//                     data={dates}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => handleDateSelect(item)}>
//                             <Text
//                                 style={{
//                                     fontSize: 16,
//                                     margin: 5,
//                                     backgroundColor: selectedDate === item.toString() ? '#ccc' : 'transparent',
//                                     padding: 10,
//                                     borderRadius: 5,
//                                 }}
//                             >
//                                 {item}
//                             </Text>
//                         </TouchableOpacity>
//                     )}
//                     numColumns={7}
//                 />
//             </View>
//             <View style={styles.habitList}>
//                 <FlatList
//                     data={habits}
//                     renderItem={renderHabit}
//                     keyExtractor={(item) => item}
//                 />
//             </View>
//             <View style={styles.addHabitContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="New Habit"
//                     value={newHabit}
//                     onChangeText={setNewHabit}
//                 />
//                 <TouchableOpacity onPress={addHabit} style={styles.addButton}>
//                     <Text style={styles.addButtonText}>Add Habit</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f7f7f7',
//     },
//     calendarContainer: {
//         width: '90%',
//         padding: 10,
//     },
//     habitList: {
//         width: '90%',
//         padding: 10,
//     },
//     habitItem: {
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//     },
//     habitText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     checked: {
//         fontSize: 18,
//         color: '#34C759',
//         marginLeft: 10,
//     },
//     addHabitContainer: {
//         width: '90%',
//         padding: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     input: {
//         width: '70%',
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         padding: 10,
//     },
//     addButton: {
//         backgroundColor: '#34C759',
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         borderRadius: 8,
//     },
//     addButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default HabitTracker;
