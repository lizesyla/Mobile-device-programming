import React, { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { id: Date.now().toString(), title: task };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const renderEmpty = () => (
    <Text style={styles.emptyText}>No tasks yet. Add your first task!</Text>
  );

  const renderHeader = () => (
    <Text style={styles.listHeader}>Your Tasks</Text>
  );

  const renderFooter = () => (
    <Text style={styles.listFooter}>End of the list</Text>
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={styles.title}>Task Manager</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f4f8" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    height: 40
  },
  addBtn: {
    backgroundColor: "#007AFF",
    marginLeft: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  btnText: { color: "white", fontWeight: "bold" },
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
  separator: {
    height: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  listFooter: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});
