import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps, Card, Checkbox, Result } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { redirectUrl, ipfsUrl, getExplorerUrl, toHexString, isValidUrl } from "../util";
import { APP_NAME, CREATE_STEPS, EXAMPLE_FORM } from "../util/constants";
import { deployContract } from "../contract/linkContract";
import { createBoard } from "../util/polybase";
import { FileDrop } from "./FileDrop";
import { uploadFiles } from "../util/stor";

function CreateRequest({ activeChain, account }) {
  const [data, setData] = useState({ files: [] })
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    if (key === 'redirectUrl') {
      value = (value.indexOf('://') === -1) ? 'http://' + value : value;
    }
    setData({ ...data, [key]: value });
  };

  const getValidationError = (data) => {
    if (!data.boardName) {
      return 'Board name is required.'
    } else if (!data.boardDescription) {
      return 'Board description is required.'
    } else if (!data.companyName) {
      return 'Company name is required.'
    } else if (!data.files) {
      return 'Please add a company logo for use on the board'
    }
    return null
  };
  const validationError = getValidationError(data);

  const create = async () => {
    setError(undefined);

    const currentNetwork = await window.ethereum.request({
      method: "eth_chainId",
    });

    const targetChainId = toHexString(activeChain.id)

    // Make sure current network is correct based on current metamask network.
    if (false && targetChainId !== currentNetwork) {
      setError(
        `Please switch to the ${activeChain.name} (${targetChainId}) network in metamask to create this featurechain request.`
      );
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ targetChainId }], // chainId must be in hexadecimal numbers
      });
      return;
    }


    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    // Format files for upload.
    let res = { ...data };
    res["chainId"] = activeChain.id;

    try {
      // 1) deploy base contract with metadata,

      const uploadResult = await uploadFiles(data.files, data);
      res = {...res, ...uploadResult}
      if (false) {
        const contract = await deployContract(data.title, data.reward, data.redirectUrl);
        // res["contract"] = contract;
        res["address"] = contract.address
        res["redirectUrl"] = redirectUrl(contract.address);

        // 3) return shareable url.
        res["contractUrl"] = getExplorerUrl(activeChain, res.address);
      }

      // Result rendered after successful doc upload + contract creation.
      setResult(res);

      const polyResult = await createBoard(
        {
          id: res.address || new Date().getTime().toString(),
          title: data.title,
        }
      )


    } catch (e) {
      console.error("error creating feature board", e);
      setError(e.message || e.toString())
    } finally {
      setLoading(false);
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (!validationError) {
      // Form is valid.
      return 1;
    }
    return 0;
  };

  const setDemoData = (e) => {
    e.preventDefault();
    setData({ ...EXAMPLE_FORM });
  };

  if (result) {
    return <Result
      status="success"
      title="Created featurechain request!"
      subTitle="Your featurechain request has been created and is ready to be shared."
      extra={[
        <Button type="secondary" key="contract">
          <a href={result.contractUrl} target="_blank">
            View created contract
          </a>
        </Button>,
        <Button type="primary" key="share">
          <a href={result.redirectUrl} target="_blank">
            Share this url
          </a>
        </Button>
      ]} />
  }



  return (
    <div>
      <Row>
        <Col span={16}>
          <Card className="create-form white boxed" title={`Create a new ${APP_NAME} request board`}>
            <a href="#" onClick={setDemoData}>Set demo data</a>
            <br />


            <label className="vertical-margin">Board name</label>
            <Input
              placeholder="Name of the feature board"
              value={data.boardName}
              prefix="Board name:"
              onChange={(e) => updateData("boardDescription", e.target.value)}
            />
            <br />

            <label className="vertical-margin">Board description</label>
            <TextArea
              placeholder="Description of the feature board"
              value={data.boardDescription}
              prefix="Board description:"
              onChange={(e) => updateData("boardName", e.target.value)}
            />

            <br/>
            <label className="vertical-margin">Company or product name:</label>
            <Input
              placeholder="This company or product name will be displayed on the Board page."
              value={data.companyName}
              prefix="Company name:"
              onChange={(e) => updateData("companyName", e.target.value)}
            />

            <br/>
            <br/>

            <label>Add company logo (named logo.png)</label>
            <FileDrop setFiles={(e) => updateData("files", e)} files={data.files}/>
           
            {/*             
            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the featurechain request"
              prefix="Description"
              value={data.description}
            /> */}

            <br/>

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              size="large"
              disabled={loading} // || !isValidData}
              loading={loading}
            >
              Create board
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div>
              <div className="error-text">{error}</div>
            </div>
            }

          </Card>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              items={CREATE_STEPS}
              current={getStep()}
            />

          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateRequest;
