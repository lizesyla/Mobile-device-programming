import { Link } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        loadTasks();
    }, [])

    const loadTasks = async () => {
        try {
            const stored = await AsyncStorage.getItem("tasks");
            const tasks = stored ? JSON.parse(stored) : [];
            setTasks(tasks)
        } catch (error) {
            console.log("Error loading tasks:", error);
        }
    }

    const fetchExternalAPI = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
            const data = await response.json();
            const newData = data.map((item) => ({
                id: item.id.toString(),
                title: item.title
            }))
            const mergedTasks = [
                ...tasks,
                ...newData.filter((item) => !tasks.some((task) => task.id === item.id))
            ]
            setTasks(mergedTasks);
            await AsyncStorage.setItem("tasks", JSON.stringify(mergedTasks));
            console.log("Fetched data from external API:", data);

        } catch (error) {
            console.log("Error fetching external API:", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteTask = (id) => {
        setSelectedTask(id);
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setModalVisible(false)

    }

    const handleModalClose = async () => {
        try {
            const updatedTasks = tasks.filter((task) => task.id !== selectedTask);
            await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
            setModalVisible(false)

        } catch (error) {
            console.log("Error deleting task:", error);
        }

    }

    const renderEmpty = () => (
        <Text style={styles.emptyText}>No tasks yet. Add your first task!</Text>
    );

    const renderHeader = () => (
        <View>
            <Text style={styles.listHeader}>Your Tasks</Text>
            <TouchableOpacity style={styles.fetchBtn} onPress={fetchExternalAPI}>
                <Text style={styles.fetchText}>Fetch Example Tasks (API)</Text>
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => (
        <Text style={styles.listFooter}>End of the list</Text>
    );

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : (
                <FlatList
                    style={styles.container}
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <Link href={`/task/${item.id}`}>
                                <Text>{item.title}</Text>
                            </Link>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <Text style={{ color: "red" }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ItemSeparatorComponent={renderSeparator}
                    ListEmptyComponent={renderEmpty}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                />
            )}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOVerlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Do you want to delete this task?</Text>
                        <View style={styles.modalBtnContainer}>
                            <TouchableOpacity onPress={handleModalCancel}>
                                <Text style={styles.modalCancelBtn}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Text style={styles.modalBtn}>OK</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightblue",
        padding: 12,
        borderRadius: 8,
        marginBottom: 4,
        elevation: 2,
    },
    separator: { height: 8 },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#888",
    },
    listHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },
    listFooter: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 14,
        color: "#666",
    },
    fetchBtn: {
        backgroundColor: "#007AFF",
        paddingVertical: 6,
        borderRadius: 6,
        marginBottom: 10,
        width: 200,
    },
    fetchText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    modalOVerlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalBox: {
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
        width: "80%",
        minHeight: 180
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    modalBtnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    modalBtn: {
        backgroundColor: "red",
        color: "white",
        padding: 10,
        borderRadius: 8
    },
    modalCancelBtn: {
        backgroundColor: "gray",
        color: "black",
        padding: 10,
        borderRadius: 8
    }
});