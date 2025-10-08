import { StyleSheet, Text, View, Button, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {id: Date.now().toString(), title: task}
    setTasks([...tasks, newTask])
    setTask('')
  }

  const renderSeparator = () => (
    <View style={{height: 10}} />
  )

  const renderHeader = () => (
    <Text style={styles.listHeader}>Your Tasks</Text>
  )

  const renderFooter = () => (
    <Text style={styles.listFooter}>End of the list</Text>
  )

  const renderEmpty = () => (
    <Text style={styles.emptyText}>No tasks yet. Please add one!</Text>
  )

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ccc" barStyle="dark-content" />
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} value={task} onChangeText={setTask} placeholder='Add a task here...'/>
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addBtn}>
            <Text style={{color: '#fff'}}>Add Task</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList style={styles.list} data={tasks} keyExtractor={(item) => item.id}
        renderItem={({item})=> (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:20,
    marginBottom: 20
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    height: 40
  },
  addBtn: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    borderRadius:8,
    marginLeft: 10,
    elevation: 10
  },
  list: {
    paddingHorizontal: 20
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    fontSize: 25,
    fontWeight: '400',
    color: 'blue',
    marginBottom: 10
  },
  listFooter: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  }
})