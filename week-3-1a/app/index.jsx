import { StyleSheet, Text, View, Button, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = { id: Date.now().toString(), title: task }
    setTasks([...tasks, newTask])
    setTask("")
  }
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

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="lightblue" />
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} value={task} onChangeText={setTask}></TextInput>
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addBtn}>
            <Text style={{ color: 'white' }}>Add Task</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList data={tasks} renderItem={({ item }) => (
        <View style={styles.taskItem}>
        <Text >{item.title}</Text>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={{color: 'red'}}>Delete</Text>
        </TouchableOpacity>
        </View>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader} 
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}/>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: "white"
  },
  addBtn: {
    backgroundColor: "darkblue",
    paddingHorizontal: 16,
    marginLeft: 8,
    color: "white",
    height: 40,
    flex: 1,
    justifyContent: "center",
    borderRadius: 8
  },
  taskItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
})