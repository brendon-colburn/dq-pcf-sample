import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import * as React from "react";
import { MyComponent, ILineItems } from "./MyComponent";

export class SampleDQ
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  // Reference to ComponentFramework Context object
  private _context: ComponentFramework.Context<IInputs>;

  // This element refers to the count of line items
  private _itemsNumber: number = 0;

  private _label: string = "1. Test Question"

  private notifyOutputChanged: () => void;

  private _response: ComponentFramework.WebApi.RetrieveMultipleResponse | null = null;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this._context = context;
    this._context.mode.trackContainerResize(true);
    this.notifyOutputChanged = notifyOutputChanged;

    context.webAPI
      .retrieveMultipleRecords("cr56f_inspectionformlineitem")
      .then((response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
        // Retrieve Multiple Web API call completed successfully
        let count1 = 0;
        let myLabel = "";
        for (const entity of response.entities) {
          count1++;
          myLabel = entity["cr56f_linetext"]
        }
        this._itemsNumber = count1;
        this._label = myLabel;
        this._response = response;
      })
      .catch(() => {
        this._itemsNumber = 99;
        this._label = "Didn't return items"
        this._response = null
      });
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    const props: any = {
      value: this._itemsNumber,
      liLabel: this._label,
      response: this._response
    };
    // Add code to update control view
    return React.createElement(MyComponent, props);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as ???bound??? or ???output???
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
