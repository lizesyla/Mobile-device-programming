import { Button, StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')

  const addTask = () => {
    if (task.trim() === '') return;

    const newTask = { id: Date.now().toString(), title: task }

    setTasks([...tasks, newTask]);
    setTask('')

  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))

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
    <Text style={[styles.listFooter, {paddingVertical: 10}]}>No tasks yet. Please add one!</Text>

  )

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='black' barStyle="light-content" />
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.row}>
        <TextInput value={task} onChangeText={setTask} placeholder='Add Task here...' style={styles.input} />
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addBtn}>
            <Text>Add Task</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList style={styles.list} data={tasks} keyExtractor={(item) => item.id} renderItem={({ item }) => (
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
    backgroundColor: '#ccc',
    padding: 20
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    elevation: 10,
    height: 40
  },
  addBtn: {
    backgroundColor: 'lightblue',
    marginLeft: 10,
    borderRadius: 8,
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 15,
    elevation: 10
  },
  list: {
    marginTop: 10,
    marginBottom: 10
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    borderRadiu: 8
  },
  listHeader: {
    fontSize: 26,
    color: 'orange',
    fontWeight: '400'
  },
  listFooter: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  }
})