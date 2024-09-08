package com.calculate

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class CalculatorPackage:ReactPackage {
    //Native module을 만든는것
    override fun createNativeModules(context: ReactApplicationContext): MutableList<NativeModule>
    = listOf(CalculatorModule(context)).toMutableList();

    //View Maneger
    //view list에는 별도로 다루고 있는것이 없기 떄문에 mutableListOf() 해준다.
    override fun createViewManagers(context: ReactApplicationContext): MutableList<ViewManager<View, ReactShadowNode<*>>>
    = mutableListOf();
}